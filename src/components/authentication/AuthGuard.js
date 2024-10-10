import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    // Replace this with your actual authentication check
    const isAuthenticated = !!localStorage.getItem('authToken');
    const isEnrolled = localStorage.getItem('clubId');

    console.log('isAuthenticated:', isAuthenticated);
    console.log('isEnrolled:', isEnrolled);

    if (!isAuthenticated || !isEnrolled) {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/" replace />;
    } else {
    return children;
    }
};

export default AuthGuard;
