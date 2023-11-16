import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RelayEnvironment from "./relay/RelayEnvironment"
import {RelayEnvironmentProvider} from "react-relay"
import { AuthProvider } from './hooks/useAuth';
import Login from "./components/Login"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <RelayEnvironmentProvider environment={RelayEnvironment}>
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    </RelayEnvironmentProvider>
);