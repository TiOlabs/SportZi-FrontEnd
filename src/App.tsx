import React from "react";
import logo from "./logo.svg";
import ArcadeRatingCardSection from "./pages/home/arcadeRatingCardSection";
import HeroSection from "./pages/home/heroSection";
import { Routes } from "react-router-dom";
import AppRoutes from "./routes/routes";

import UserProvider from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
