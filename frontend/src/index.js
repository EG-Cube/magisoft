import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ItineraryContextProvider } from "./context/ItineraryContext";
import { EnquiryContextProvider } from "./context/EnquiryContext";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import { SiteContextProvider } from "./context/SiteContext";
import { TransportContextProvider } from "./context/TransportContext";
import { HotelContextProvider } from "./context/HotelContext";
import { RestaurantContextProvider } from "./context/RestaurantContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItineraryContextProvider>
        <EnquiryContextProvider>
          <SiteContextProvider>
            <TransportContextProvider>
              <HotelContextProvider>
                <RestaurantContextProvider>
                  <UserContextProvider>
                    <App />
                  </UserContextProvider>
                </RestaurantContextProvider>
              </HotelContextProvider>
            </TransportContextProvider>
          </SiteContextProvider>
        </EnquiryContextProvider>
      </ItineraryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
