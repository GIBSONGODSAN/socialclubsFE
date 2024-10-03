import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({ // Corrected this line
    baseURL: 'https://socialclubsbe.onrender.com/api', // Replace with your API's base URL
});

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('authToken');

        // If a token is found, add it to the request's Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Optionally, add a response interceptor for handling responses
axios.interceptors.response.use(
    (response) => {
        // Return the response if it's successful
        return response;
    },
    (error) => {
        // Handle any errors, such as expired tokens or unauthorized access
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access - maybe token expired');
            // Redirect user to login page or handle refresh token logic
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;