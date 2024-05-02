import React from "react";
import logo from "./logo.svg";
import ArcadeRatingCardSection from "./pages/home/arcadeRatingCardSection";
import HeroSection from "./pages/home/heroSection";
import { Routes } from "react-router-dom";
import AppRoutes from "./routes/routes";

import { PlayerProvider } from "./context/player.context";
import { ArcadeProvider } from "./context/Arcade.context";

function App() {
  return (
    <ArcadeProvider>
      <PlayerProvider>
        <AppRoutes />
      </PlayerProvider>
    </ArcadeProvider>
  );
}

export default App;
