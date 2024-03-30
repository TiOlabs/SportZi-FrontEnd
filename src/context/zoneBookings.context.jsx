import React, { useEffect, useState } from "react";

const ZoneBookingsContext = React.createContext();

const ZoneBookingsProvider = ({ children }) => {
  const [zoneId, setZoneId] = useState(null);
  useEffect(() => {
    const zoneId = localStorage.getItem("zoneId");
    console.log("zoneId", zoneId);
    setZoneId(zoneId);
  }, [zoneId]);
  console.log("zoneId", zoneId);

  // Other context provider logic...

  return (
    <ZoneBookingsContext.Provider value={{ zoneId, setZoneId }}>
      {children}
    </ZoneBookingsContext.Provider>
  );
};

export { ZoneBookingsContext, ZoneBookingsProvider };
