import React, { createContext, useContext, useReducer } from 'react';

// Create context
const AuthContext = createContext();

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const initialState = {
        user: null,
        isAuthenticated: false,
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
