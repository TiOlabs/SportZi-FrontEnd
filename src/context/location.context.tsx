import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface LocationContextType {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(() => {
    const storedLocation = localStorage.getItem("selectedLocation");
    return storedLocation ? JSON.parse(storedLocation) : null;
  });

  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));
    }
  }, [selectedLocation]);

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider, useLocation };
