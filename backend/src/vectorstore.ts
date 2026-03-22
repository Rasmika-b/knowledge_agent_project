import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
  baseUrl: "http://localhost:11434",
});

let vectorStore: MemoryVectorStore | null = null;

export async function getVectorStore() {
  if (!vectorStore) {
    vectorStore = new MemoryVectorStore(embeddings);
  }
  return vectorStore;
}

export async function addDocuments(texts: string[]) {
  const store = await getVectorStore();
  await store.addDocuments(
    texts.map((text) => ({ pageContent: text, metadata: {} }))
  );
}