import React, { useState } from 'react';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    console.log('UserID', userId);

    // Other context provider logic...

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };