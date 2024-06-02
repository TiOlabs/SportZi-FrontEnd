import React, { useEffect, useState } from "react";

const ZoneBookingsContext = React.createContext();

const ZoneBookingsProvider = ({ children }) => {
  const [zoneId, setZoneId] = useState(null);
  const [zoneBookings, setZoneBookings] = useState({
    date: "",
    time: "",
    participant_count: "",
    user_id: "",
    zone_id: "",
  });

  // Function to update the state when localStorage changes
  const updateZoneIdFromLocalStorage = () => {
    const storedZoneId = localStorage.getItem("zoneId");
    if (storedZoneId !== zoneId) {
      setZoneId(storedZoneId);
    }
  };

  useEffect(() => {
    updateZoneIdFromLocalStorage(); // Initial load

    // Check for changes in localStorage every second
    const interval = setInterval(() => {
      updateZoneIdFromLocalStorage();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("zoneBookings", zoneBookings);
  }, [zoneBookings]);

  return (
    <ZoneBookingsContext.Provider
      value={{ zoneId, setZoneId, zoneBookings, setZoneBookings }}
    >
      {children}
    </ZoneBookingsContext.Provider>
  );
};

export { ZoneBookingsContext, ZoneBookingsProvider };