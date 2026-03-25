import { createRoot } from "react-dom/client";
import { App } from "./App/App";
import './main.scss'

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Элемент #root не найден!");
}