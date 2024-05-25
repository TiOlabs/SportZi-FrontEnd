import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ZoneBookingsProvider } from "./context/zoneBookings.context";
import { UserIdProvider } from "./context/userId.context";
import { CoachBookingProvider } from "./context/coachBooking.context";
import { PackageEnrollProvider } from "./context/packageEnroll.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserIdProvider>
        <CoachBookingProvider>
          <ZoneBookingsProvider>
            <PackageEnrollProvider>
              <App />
            </PackageEnrollProvider>
          </ZoneBookingsProvider>
        </CoachBookingProvider>
      </UserIdProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
