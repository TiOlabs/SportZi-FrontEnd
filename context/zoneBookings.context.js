import React, { useState } from 'react';

const ZoneBookingsContext = React.createContext();

const ZoneBookingsProvider = ({ children }) => {
    const [zoneId, setZoneId] = useState(null);

    // Other context provider logic...

    return (
        <ZoneBookingsContext.Provider value={{ zoneId, setZoneId }}>
            {children}
        </ZoneBookingsContext.Provider>
    );
};

export { ZoneBookingsContext, ZoneBookingsProvider };