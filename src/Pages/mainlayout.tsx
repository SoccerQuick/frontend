import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import './main.css';

const Main = () => {
  return (
    <>
      <Header />
      <BodyContainer></BodyContainer>
      <Footer />
    </>
  );
};

export default Main;

const BodyContainer = styled.div`
  width: 98.4rem;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100rem;
  background-color: lightgray;
`;
