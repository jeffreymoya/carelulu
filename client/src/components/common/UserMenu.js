import React from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom"

const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  margin-right: 10px;
  background-color: #f2f2f2; /* Add a slightly different background color */
  padding: 5px;
  border-radius: 5px;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  background: #e6e6e6; /* Add a slightly different background color */
  border: none;
  color: inherit;
  padding: 5px;
  font: inherit;
  text-decoration: underline;
  transition-duration: 0.4s;
  border-radius: 5px;

  &:hover {
    color: #45a049;
  }
`;

const UserMenu = () => {
    const {username} = JSON.parse(localStorage.getItem('user') || '{}' );
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_LOGOUT_ENDPOINT, {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });

            if (response.ok) {
                localStorage.removeItem('user');
                navigate('/login')
            } else {
                // Handle error
                console.error('Logout failed');
            }
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <UserMenuContainer>
            <Username>Hi, {username}</Username>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserMenuContainer>
    );
};

export default UserMenu;