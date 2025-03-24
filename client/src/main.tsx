import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Removed problematic import: "@studio-freight/lenis/reset.css"

createRoot(document.getElementById("root")!).render(<App />);
