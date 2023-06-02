import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import HeaderCategory from '../Components/Commons/HeaderCategory';
import Footer from '../Components/Footer';

const Main = () => {
  return (
    <>
      <Header />
      <HeaderCategory />
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
