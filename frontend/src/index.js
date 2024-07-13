import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EnquiryContextProvider } from "./context/EnquiryContext";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EnquiryContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </EnquiryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
