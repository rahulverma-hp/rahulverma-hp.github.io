import { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    title: "Lifeve",
    date: '2025',
    subtext:
      "Scans product ingredients and uses your profile (age/height/weight) to highlight what’s good or risky in the product.",
    urls: [
      {
        text: "GitHub Repo",
        url: "https://github.com/rahulverma-hp/lifeve",
      },
      {
        text: "Live Website",
        url: "https://rahulverma-hp.github.io/Product-Scanner/",
      },
    ],
  },
  {
    title: "Data Analytic Agent",
    date: "2026",
    subtext:
      "Built an interactive Streamlit app that ingests CSV/XLSX, preprocesses data, loads it into DuckDB, and answers natural-language questions via LLM-driven SQL tool use with provider/model switching via environment config.",
    urls: [
      {
        text: "GitHub Repo",
        url: "https://github.com/rahulverma-hp/Data-Analytic-Agent",
      },
      {
        text: "Live Website",
        url: "https://data-analytic-agent-gebfcvbrmbbr4owsgaunjp.streamlit.app/",
      },
    ],
  },
  {
    title: "Private Document Q&A",
    date: "2026",
    subtext:
      "Built a local RAG Streamlit app to chat with uploaded documents using a locally hosted Llama model (Ollama) and Qdrant-backed embeddings for grounded, citation-style answers.",
    urls: [
      {
        text: "GitHub Repo",
        url: "https://github.com/rahulverma-hp/Document-RAG",
      },
    ],
  },
];
