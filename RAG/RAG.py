from unstructured.partition.auto import partition
from unstructured.chunking.title import chunk_by_title
from sentence_transformers import SentenceTransformer,util
import faiss
from io import BytesIO
from typing import Tuple, List
import numpy as np
import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.vectorstores.faiss import FAISS
from dotenv import load_dotenv
import torch
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, ContentSettings
device = torch.device('cuda'if torch.cuda.is_available() else'cpu')

class Document:
  def __init__(self, page_content,embedding,  metadata,id,user_id):
      self.page_content = page_content
      self.embedding = embedding
      self.metadata = metadata
      self.id = id
      self.user_id = user_id

def getEmbeddings(text,model_name='all-MiniLM-L6-v2'):
    model = SentenceTransformer(model_name)
    embeddings = model.encode(text)
    return embeddings


# Function to embed and store chunks in vector database
def embed_and_store_chunks(folder_path):
    # Initialize the SentenceTransformer model
    model = SentenceTransformer('all-MiniLM-L6-v2').to(device)

    # Create a list to store Document objects
    doc_chunks = []
    for filename in os.listdir(folder_path):
      if filename.endswith('pdf'):
        pdf_path = os.path.join(folder_path, filename)
        try:
          elements = partition(pdf_path)
        except Exception as e:
          print(f"An error occurred when trying to partition the file: {e,filename}")
          continue
        chunks = chunk_by_title(elements, new_after_n_chars=1500, combine_text_under_n_chars=500)
        # Embed each chunk and create Document objects
        for i, chunk in enumerate(chunks):
            # Embed the chunk using SentenceTransformer
            chunk_embedding = model.encode(chunk.text)
            page_number = chunk.metadata.page_number
            doc_id = f"{filename}-{i}"
            # Create a Document object for the chunk
            doc = Document(page_content=chunk.text, embedding=chunk_embedding ,metadata={"page": page_number},id=doc_id)
            doc.metadata["source"] = f"{doc.metadata['page']}-{doc_id}"
            doc.metadata["filename"] = filename
            doc_chunks.append(doc)
        print(filename,"complete")
    metadatax = [doc.metadata for doc in doc_chunks]  # Extract metadata from each Document
    idx = [doc.id for doc in doc_chunks]  # Extract ID from each Document
    # Extract just the embeddings from each Document
    embeddings = [model.encode(doc.page_content) for doc in doc_chunks]
    #Stores all encoded embeddings in the vector DB
    vectorstore_faiss = FAISS.from_embeddings([(doc.page_content, model.encode(doc.page_content)) for doc in doc_chunks], model,metadatas=metadatax,ids=idx)
    return vectorstore_faiss



def upload_folder_to_blob(account_name, account_key, container_name, local_folder_path, remote_folder_name):
    # Create a connection string
    connect_str = f'DefaultEndpointsProtocol=https;AccountName={account_name};AccountKey={account_key};EndpointSuffix=core.windows.net'

    # Create a BlobServiceClient
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)

    # Get a container client
    container_client = blob_service_client.get_container_client(container_name)

    # Iterate through local files and upload them to Azure Blob Storage
    for root, dirs, files in os.walk(local_folder_path):
        for file_name in files:
            local_file_path = os.path.join(root, file_name)
            blob_name = os.path.join(remote_folder_name, os.path.relpath(local_file_path, local_folder_path)).replace("\\", "/")

            # Create a BlobClient and upload the file
            blob_client = container_client.get_blob_client(blob_name)
            with open(local_file_path, "rb") as data:
                blob_client.upload_blob(data, overwrite=True)

    print(f"Folder '{local_folder_path}' uploaded to Azure Blob Storage container '{container_name}/{remote_folder_name}'.")


def download_folder_from_blob(account_name, account_key, container_name, remote_folder_name, local_folder_path):
 # Create a connection string
 connect_str = f'DefaultEndpointsProtocol=https;AccountName={account_name};AccountKey={account_key};EndpointSuffix=core.windows.net'

 # Create a BlobServiceClient
 blob_service_client = BlobServiceClient.from_connection_string(connect_str)

 # Get a container client
 container_client = blob_service_client.get_container_client(container_name)

 # List blobs in the specified folder
 blob_list = container_client.list_blobs(name_starts_with=remote_folder_name)

 # Download each blob to the local folder
 for blob in blob_list:
     blob_name = blob.name

     # Extract the base file name from the blob name
     base_file_name = os.path.basename(blob_name)

     local_file_path = os.path.join(local_folder_path, base_file_name)

     # Create necessary directories
     os.makedirs(os.path.dirname(local_file_path), exist_ok=True)

     # Create a BlobClient and download the file
     blob_client = container_client.get_blob_client(blob_name)
     with open(local_file_path, "wb") as data:
         data.write(blob_client.download_blob().readall())

def addPDFtoVectorDB(filepath,vectorDBpath,model='all-MiniLM-L6-v2' ):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    doc_chunks = []
    download_folder_from_blob(account_name, account_key, container_name, "faiss_index", vectorDBpath)
    vector_db = FAISS.load_local(vectorDBpath,model)
    if filepath.endswith('pdf'):
      filename = os.path.basename(filepath)
      print(filename,"started")
      elements = partition(filepath)
      # try:
      #   elements = partition(filepath)
      # except Exception as e:
      #   print(f"An error occurred when trying to partition the file: {e,filename}")
      chunks = chunk_by_title(elements, new_after_n_chars=1500, combine_text_under_n_chars=700)
      for i, chunk in enumerate(chunks):
            # Embed the chunk using SentenceTransformer
            chunk_embedding = model.encode(chunk.text)
            page_number = chunk.metadata.page_number
            doc_id = f"{filename}-{i}"
            # Create a Document object for the chunk
            doc = Document(page_content=chunk.text, embedding=chunk_embedding ,metadata={"page": page_number},id=doc_id)
            doc.metadata["source"] = f"{doc.metadata['page']}-{doc_id}"
            doc.metadata["filename"] = filename
            doc_chunks.append(doc)
      print(filename,"complete")
      metadatax = [doc.metadata for doc in doc_chunks]  # Extract metadata from each Document
      idx = [doc.id for doc in doc_chunks]  # Extract ID from each Document
      # Extract just the embeddings from each Document
      embeddings = [model.encode(doc.page_content) for doc in doc_chunks]
      # Add the embeddings to the vectorstore
      vector_db.add_embeddings(list(zip([doc.page_content for doc in doc_chunks], embeddings)), metadatas=metadatax, ids=idx)
      upload_folder_to_blob(account_name, account_key, container_name, vectorDBpath, "faiss_index")


if __name__ == '__main__':
    load_dotenv()
  account_name = os.getenv('account_name')
  account_key = os.getenv('account_key')
  container_name = os.getenv('container_name')
  print("Account Name:",account_name)
  print("Account Key:",account_key)
  print("Container Name:",container_name)