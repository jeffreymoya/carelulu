import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if(!localStorage.getItem('user')) return

                const response = await fetch(process.env.REACT_APP_VERIFY_ENDPOINT, {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });

                if (response.status === 401) { // If the token is expired
                    setIsAuthenticated(false);
                    navigate('/login');
                } else {
                    setIsAuthenticated(response.ok);
                    navigate('/tasks')
                }
            } catch (error) {
                // Handle error
            }
        };

        // Check auth status immediately
        checkAuth();
        // Check auth status every 5 minutes 5 * 60 * 1000
        const intervalId = setInterval(checkAuth, 5 * 60 * 1000);

        // Clear interval on cleanup
        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <AuthContext.Provider value={isAuthenticated}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};