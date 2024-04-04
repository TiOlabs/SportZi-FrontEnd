import React, { useState } from 'react';

const UserIdContext = React.createContext<any>(null);

const UserIdProvider = ({ children }:any) => {
    const [userId, setUserId] = useState(null);
    console.log('userId', userId);

    // Other context provider logic...

    return (
        <UserIdContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserIdContext.Provider>
    );
};

export { UserIdContext, UserIdProvider };