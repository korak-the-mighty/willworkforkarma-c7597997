import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppLoader from "./components/AppLoader.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AppLoader>
    <App />
  </AppLoader>
);
