import { Ollama } from "@langchain/community/llms/ollama";
import { RetrievalQAChain } from "langchain/chains";
import { getVectorStore } from "./vectorstore";

const llm = new Ollama({
  model: "qwen2:7b",
  baseUrl: "http://localhost:11434",
});

export async function runAgent(question: string): Promise<string> {
  const vectorStore = await getVectorStore();
  const retriever = vectorStore.asRetriever({ k: 3 });
  const chain = RetrievalQAChain.fromLLM(llm, retriever);
  const result = await chain.call({ query: question });
  return result.text;
}