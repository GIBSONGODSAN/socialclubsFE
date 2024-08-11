import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    // Replace this with your actual authentication check
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (!isAuthenticated) {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/" replace />;
    }

    // Render the child components if the user is authenticated
    return children;
};

export default AuthGuard;
