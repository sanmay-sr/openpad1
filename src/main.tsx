
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple debugging to check if script runs
console.log("main.tsx is running");

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  const root = createRoot(rootElement);
  root.render(<App />);
}
