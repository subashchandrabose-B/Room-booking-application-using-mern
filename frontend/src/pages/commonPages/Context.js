import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    return (
        <UserContext.Provider value={{ userData, setUserData, selectedDate, setSelectedDate }}>
            {children}
        </UserContext.Provider>
    );
};
