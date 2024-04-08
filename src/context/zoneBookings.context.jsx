import React, { useEffect, useState } from "react";

const ZoneBookingsContext = React.createContext();

const ZoneBookingsProvider = ({ children }) => {
  const [zoneId, setZoneId] = useState(null);
  const [zoneBookings, setZoneBookings] = useState({
    date: "",
    time: "",
    // rate: fullAmount,
    participant_count: "",
    user_id: "",
    zone_id: "",
  });
  useEffect(() => {
    const zoneId = localStorage.getItem("zoneId");
    console.log("zoneId", zoneId);
    setZoneId(zoneId);
  }, [zoneId]);
  console.log("zoneId", zoneId);

  useEffect(() => {
    console.log("zoneBookings", zoneBookings);
  
  }, [zoneBookings]);

  // Other context provider logic...

  return (
    <ZoneBookingsContext.Provider value={{ zoneId, setZoneId,zoneBookings,setZoneBookings }}>
      {children}
    </ZoneBookingsContext.Provider>
  );
};

export { ZoneBookingsContext, ZoneBookingsProvider };
