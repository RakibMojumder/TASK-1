import React, { createContext, useEffect, useState } from 'react';

export const AUTH_CONTEXT = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AUTH_CONTEXT.Provider value={{ user, setUser }}>
            {children}
        </AUTH_CONTEXT.Provider>
    );
};

export default AuthProvider;