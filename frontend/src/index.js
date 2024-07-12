import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EnquiryContextProvider } from "./context/EnquiryContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EnquiryContextProvider>
        <App />
      </EnquiryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
