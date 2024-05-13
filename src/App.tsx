import React from "react";
import logo from "./logo.svg";
import ArcadeRatingCardSection from "./pages/home/arcadeRatingCardSection";
import HeroSection from "./pages/home/heroSection";
import { Routes } from "react-router-dom";
import AppRoutes from "./routes/routes";

import { PlayerProvider } from "./context/player.context";
import { ArcadeProvider } from "./context/Arcade.context";
import { CoachProvider } from "./context/coach.context";

function App() {
  return (
    <ArcadeProvider>
      <CoachProvider>
        <PlayerProvider>
          <AppRoutes />
        </PlayerProvider>
      </CoachProvider>
    </ArcadeProvider>
  );
}

export default App;
