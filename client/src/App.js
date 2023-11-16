import React from 'react';
import {useAuth} from "./hooks/useAuth"
import Tasks from "./components/tasks/Tasks"
import {Navigate} from "react-router-dom"

function App() {
    const isAuthenticated = useAuth();

    if(!isAuthenticated) return <Navigate to={'login'} />;

    return (
        <Tasks/>
    )
}

export default App;