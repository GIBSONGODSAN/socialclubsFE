import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const handleLogout = () => {

        // Clear browser memory (e.g., localStorage, sessionStorage)
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to home page
        navigate('/');
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <div className="text-xl font-semibold">
                Students Welfare
            </div>
            <button onClick={handleLogout}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
                LOGOUT
            </button>
        </header>
    );
};

export default Header;
