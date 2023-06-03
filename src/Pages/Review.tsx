import React from 'react';
import styled from 'styled-components';
import HeaderCategory from '../Components/Commons/HeaderCategory';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Review() {
  return (
    <>
      <Header />
      <HeaderCategory />
      <StyledBodyContainer>
        <StyledCarousel>abc</StyledCarousel>
      </StyledBodyContainer>
      <Footer />
    </>
  );
}

const StyledBodyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  width: 98.5rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StyledCarousel = styled.div`
  background-color: #f2f5f7;
`;
