import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css' 
import './styles/animations.css'

// Detailed debugging
console.log("main.tsx is starting execution");

const rootElement = document.getElementById("root");
console.log("Root element found:", rootElement);

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  console.log("Creating React root");
  const root = createRoot(rootElement);
  console.log("Rendering App component");
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Render complete");
}
