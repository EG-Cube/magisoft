import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EnquiryContextProvider } from "./context/EnquiryContext";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import { SiteContextProvider } from "./context/SiteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EnquiryContextProvider>
        <SiteContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </SiteContextProvider>
      </EnquiryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
