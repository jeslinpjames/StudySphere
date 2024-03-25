from unstructured.partition.auto import partition
from unstructured.chunking.title import chunk_by_title
from sentence_transformers import SentenceTransformer
import os
from langchain.docstore.document import Document
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
import torch
from azure.storage.blob import BlobServiceClient

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


class Document:
    def __init__(self, page_content, embedding, metadata, id, user_id):
        self.page_content = page_content
        self.embedding = embedding
        self.metadata = metadata
        self.id = id
        self.user_id = user_id


def getEmbeddings(text, model_name="all-MiniLM-L6-v2"):
    model = SentenceTransformer(model_name)
    embeddings = model.encode(text)
    return embeddings


def addPDFtoVectorDB(
    filepath: str, vector_db: FAISS, user_id: str, model: str = "all-MiniLM-L6-v2"
) -> None:
    """
    Adds the content of a PDF file to a vector database, partitioning the PDF into chunks and embedding each chunk.

    This function processes a PDF file, partitions it into chunks based on titles, and then embeds each chunk using a specified SentenceTransformer model. The embeddings are then added to the provided FAISS vector database.

    Parameters
    ----------
    filepath : str
        The path to the PDF file to be processed.
    vector_db : FAISS
        The FAISS vector database to which the embeddings will be added.
    user_id : str
        The unique identifier for the user associated with the PDF file.
    model : str, optional
        The name of the SentenceTransformer model to use for embedding. Default is "all-MiniLM-L6-v2".

    Returns
    -------
    None

    Raises
    ------
    Exception
        If an error occurs during the partitioning or embedding process.

    Notes
    -----
    The function assumes that the PDF file is in a format that can be partitioned into chunks based on titles. It also assumes that the FAISS vector database is properly initialized and ready to receive embeddings.
    """
    model = SentenceTransformer(model)
    doc_chunks = []
    if filepath.endswith("pdf"):
        filename = os.path.basename(filepath)
        print(filename, "started")
        elements = partition(filepath)
        chunks = chunk_by_title(
            elements, new_after_n_chars=1500, combine_text_under_n_chars=500
        )
        for i, chunk in enumerate(chunks):
            chunk_embedding = model.encode(chunk.text)
            page_number = chunk.metadata.page_number
            doc_id = f"{filename}-{i}"
            doc = Document(
                page_content=chunk.text,
                embedding=chunk_embedding,
                metadata={"page": page_number},
                id=doc_id,
                user_id=user_id,
            )
            doc.metadata["source"] = f"{doc.metadata['page']}-{doc_id}"
            doc.metadata["filename"] = filename
            doc_chunks.append(doc)
        print(filename, "complete")
        metadatax = [doc.metadata for doc in doc_chunks]
        idx = [doc.id for doc in doc_chunks]
        embeddings = [model.encode(doc.page_content) for doc in doc_chunks]
        vector_db.add_embeddings(
            list(zip([doc.page_content for doc in doc_chunks], embeddings)),
            metadatas=metadatax,
            ids=idx,
        )


def upload_folder_to_blob(
    account_name: str,
    account_key: str,
    container_name: str,
    local_folder_path: str,
    remote_folder_name: str,
) -> None:
    """
    Uploads a local folder to Azure Blob Storage, maintaining the directory structure.

    This function connects to Azure Blob Storage using the provided account name and key,
    iterates through all files in the specified local folder and its subfolders, and uploads
    each file to the specified remote folder in the Azure Blob Storage container. It ensures
    that the directory structure is preserved in the blob storage.

    Parameters
    ----------
    account_name : str
        The name of the Azure Storage account.
    account_key : str
        The key for the Azure Storage account.
    container_name : str
        The name of the container in the Azure Storage account.
    local_folder_path : str
        The path to the local folder to be uploaded.
    remote_folder_name : str
        The name of the remote folder in the container where the files will be uploaded.

    Returns
    -------
    None
    """
    connect_str = f"DefaultEndpointsProtocol=https;AccountName={account_name};AccountKey={account_key};EndpointSuffix=core.windows.net"
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_client = blob_service_client.get_container_client(container_name)

    for root, dirs, files in os.walk(local_folder_path):
        for file_name in files:
            local_file_path = os.path.join(root, file_name)
            blob_name = os.path.join(
                remote_folder_name, os.path.relpath(local_file_path, local_folder_path)
            ).replace("\\", "/")

            blob_client = container_client.get_blob_client(blob_name)
            with open(local_file_path, "rb") as data:
                blob_client.upload_blob(data, overwrite=True)

    print(
        f"Folder '{local_folder_path}' uploaded to Azure Blob Storage container '{container_name}/{remote_folder_name}'."
    )


def download_folder_from_blob(
    account_name: str,
    account_key: str,
    container_name: str,
    remote_folder_name: str,
    local_folder_path: str,
) -> None:
    """
    Downloads a folder from Azure Blob Storage to a local folder.

    This function connects to Azure Blob Storage using the provided account name and key,
    lists all blobs within the specified remote folder, and downloads each blob to the
    specified local folder path. It ensures that the necessary local directories are
    created before downloading the files.

    Parameters
    ----------
    account_name : str
        The name of the Azure Storage account.
    account_key : str
        The key for the Azure Storage account.
    container_name : str
        The name of the container in the Azure Storage account.
    remote_folder_name : str
        The name of the remote folder in the container from which to download blobs.
    local_folder_path : str
        The path to the local folder where the blobs will be downloaded.

    Returns
    -------
    None
    """
    connect_str = f"DefaultEndpointsProtocol=https;AccountName={account_name};AccountKey={account_key};EndpointSuffix=core.windows.net"
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_client = blob_service_client.get_container_client(container_name)
    blob_list = container_client.list_blobs(name_starts_with=remote_folder_name)

    for blob in blob_list:
        blob_name = blob.name
        base_file_name = os.path.basename(blob_name)
        local_file_path = os.path.join(local_folder_path, base_file_name)
        os.makedirs(os.path.dirname(local_file_path), exist_ok=True)
        blob_client = container_client.get_blob_client(blob_name)
        with open(local_file_path, "wb") as data:
            data.write(blob_client.download_blob().readall())


def init_vector_db(
    user_id, chat_id, root_folder="VectorDBs", model_name="all-MiniLM-L6-v2"
) -> FAISS:
    """
    Initializes a vector database for a given user and chat, using the specified SentenceTransformer model.

    This function creates a directory structure based on the user and chat IDs, initializes a SentenceTransformer
    model with the specified model name, encodes sample texts into embeddings, and then creates a FAISS vectorstore
    from these embeddings. The vectorstore is saved to a local file within the user and chat directories.

    Parameters
    ----------
    user_id : str
        The unique identifier for the user.
    chat_id : str
        The unique identifier for the chat.
    root_folder : str, optional
        The root folder where the user and chat directories will be created. Default is "VectorDBs".
    model_name : str, optional
        The name of the SentenceTransformer model to use for encoding texts. Default is 'all-MiniLM-L6-v2'.

    Returns
    -------
    FAISS
        The initialized FAISS vectorstore.

    """
    model = SentenceTransformer(model_name)
    text = "..."
    text_embeddings = model.encode(text)

    os.makedirs(root_folder, exist_ok=True)

    user_folder = os.path.join(root_folder, user_id)
    chat_folder = os.path.join(user_folder, chat_id)

    os.makedirs(chat_folder, exist_ok=True)

    vector_db_path = os.path.join(chat_folder, "vector_db")

    vectorstore_faiss = FAISS.from_embeddings([(text, text_embeddings)], model)

    vectorstore_faiss.save_local(vector_db_path)

    return vectorstore_faiss


def load_vector_db(user_id, chat_id, root_folder="VectorDBs") -> FAISS:
    """
    Loads a FAISS vector database from a local directory.

    Parameters
    ----------
    user_id : str
        The unique identifier for the user.
    chat_id : str
        The unique identifier for the chat.
    root_folder : str, optional
        The root folder where the user and chat directories are located. Default is "VectorDBs".

    Returns
    -------
    FAISS
        The loaded FAISS vectorstore.
    """
    vector_db_path = os.path.join(root_folder, user_id, chat_id, "vector_db")
    vector_db = FAISS.load_local(vector_db_path)
    return vector_db


def remove_pdf_embeddings(vectordb, pdf_filename) -> None:
    """
    Removes all embeddings associated with a specific PDF from the vector database.

    This function is designed to facilitate the removal of documents from a FAISS vector store that are associated with a given PDF file. It iterates through the documents in the vector database's docstore, identifies those linked to the specified PDF filename, and removes them from both the FAISS index and the docstore. This process ensures that the vector database is updated to reflect the removal of the specified PDF's embeddings, maintaining the integrity and relevance of the data within the database.

    Parameters
    ----------
    vectordb : FAISS
        The FAISS vector database from which to remove embeddings. This should be an instance of a FAISS vector store that has been previously set up and populated with documents.
    pdf_filename : str
        The filename of the PDF whose embeddings are to be removed. This string should match the filename metadata associated with the documents in the vector database.

    Returns
    -------
    None
        The function does not return any value.

    Notes
    -----
    This function is particularly useful in scenarios where documents associated with a specific PDF need to be removed from the vector database, such as when updating or deleting documents. It aligns with best practices for managing documents within a FAISS vector store, ensuring that the vector database remains accurate and up-to-date.
    """
    chunk_ids = []

    for doc_id, doc in vectordb.docstore._dict.items():
        if doc.metadata.get("filename") == pdf_filename:
            chunk_ids.append(doc_id)
    vectordb.delete(chunk_ids)


def search_and_return_top_k(query, vectordb, k):
    """
    Performs a similarity search on the given vector database and returns the top-k results.

    Parameters
    ----------
    query : str
        The query text to search for.
    vectordb : FAISS
        The FAISS vector database to search within.
    k : int
        The number of top results to return.

    Returns
    -------
    list
        A list of top-k results, each containing page content and metadata.
    """
    query_embedding = getEmbeddings(query)
    top_k_result = vectordb.similarity_search_by_vector(query_embedding, k)
    results = []
    for i in range(k):
        result = {
            "page_content": top_k_result[i].page_content,
            "metadata": top_k_result[i].metadata,
        }
        results.append(result)
    return results


if __name__ == "__main__":
    load_dotenv()
    account_name = os.getenv("account_name")
    account_key = os.getenv("account_key")
    container_name = os.getenv("container_name")
    print("Account Name:", account_name)
    print("Account Key:", account_key)
    print("Container Name:", container_name)

    pdf_path = "../DATA/AgileDesignDocument.pdf"
    user_id = "User_1"  # Unique identifier for the user
    chat_id = "Chat_1"  # Unique identifier for the chat
    query = "What is StudySphere?"  # Query text to search for

    # Initialize the vector database
    vectordb = init_vector_db(user_id, chat_id)

    # Add the PDF to the vector database
    addPDFtoVectorDB(pdf_path, vectordb, user_id, model="all-MiniLM-L6-v2")

    # Perform a similarity search
    results = search_and_return_top_k(query, vectordb, 5)
    print(results)
