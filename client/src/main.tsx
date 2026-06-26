import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "./components/mui/AppTheme.jsx";
import { ExpenseProvider } from "./context/ExpenseContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppTheme>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
      </AppTheme>
    </BrowserRouter>
  </StrictMode>,
);
