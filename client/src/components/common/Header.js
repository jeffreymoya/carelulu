import React from 'react';
import styled from "styled-components"
import UserMenu from "./UserMenu"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.header`
  background-color: #f0f0f0;
  color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`

const HeaderComponent = () => {
    return (
        <Container>
            <Header>
                <h1>Todo List</h1>
                { localStorage.getItem('user') && <UserMenu /> }
            </Header>
        </Container>
    )
};

export default HeaderComponent;