import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "./components/mui/AppTheme.jsx";
import { ExpenseProvider } from "./context/ExpenseContext.tsx";
import { store } from "./redux/Store.ts";
import { Provider } from "react-redux";


createRoot(document.getElementById("root")!).render(

  <StrictMode>
    <BrowserRouter>
      <AppTheme>
        <Provider store={store}>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
        </Provider>
      </AppTheme>
    </BrowserRouter>
  </StrictMode>,
);
