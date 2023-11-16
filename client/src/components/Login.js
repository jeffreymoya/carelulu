import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Header from "./common/Header"
import Footer from "./common/Footer"
import {useNavigate} from "react-router-dom"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(70vh);
`;

const Input = styled.input`
  margin-bottom: 10px;
`;

const Error = styled.p`
  color: red;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        if (username === '' || password === '') {
            setError('Username and password are required');
            return;
        }

        try {
            const response = await fetch(process.env.REACT_APP_LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                setError('Invalid username or password');
            } else {
                const user = await response.json()
                localStorage.setItem('user', JSON.stringify(user));
                setError(null);
                navigate('/tasks')
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    }, [username, password, navigate]);

    return (
        <>
            <Header/>
            <Form onSubmit={handleSubmit}>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                {error && <Error>{error}</Error>}
                <button type="submit">Login</button>
            </Form>
            <Footer/>
        </>
    );
};

export default Login;