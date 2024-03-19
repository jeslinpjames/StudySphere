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
import torch
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, ContentSettings
device = torch.device('cuda'if torch.cuda.is_available() else'cpu')

def getEmbeddings(text,model_name='all-MiniLM-L6-v2'):
    model = SentenceTransformer(model_name)
    embeddings = model.encode(text)
    return embeddings

class Document:
  def __init__(self, page_content,embedding,  metadata,id,user_id):
      self.page_content = page_content
      self.embedding = embedding
      self.metadata = metadata
      self.id = id
      self.user_id = user_id

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

# Embed and store chunks in vector database
vector_db = embed_and_store_chunks("/content/test/")