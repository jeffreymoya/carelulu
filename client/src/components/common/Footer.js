import React from 'react';
import styled from "styled-components"

const Footer = styled.footer`
  position: fixed; // Make the footer stick to the window
  bottom: 0; // Position the footer at the bottom of the window
  width: 100%; // Make the footer span the entire width of the window
  background-color: #f0f0f0;
  color: #000;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`

const FooterComponent = () => (
    <Footer>
        <p>CareLulu</p>
    </Footer>
);

export default FooterComponent;