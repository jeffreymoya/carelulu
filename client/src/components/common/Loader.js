import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';
import Header from "./Header"
import Footer from "./Footer"

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 70px;
  height: 100vh;
`;

const Loader = () => (
    <>
        <Header />
        <LoaderContainer>
            <ContentLoader
                speed={2}
                width={400}
                height={150}
                viewBox="0 0 400 150"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                {Array.from({ length: 10 }).map((_, i) => (
                    <rect key={i} x="15" y={15 + i * 35} rx="4" ry="4" width="320" height="20" />
                ))}
            </ContentLoader>
        </LoaderContainer>
        <Footer />
    </>
);

export default Loader;