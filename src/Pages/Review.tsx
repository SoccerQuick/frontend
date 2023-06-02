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
        <StyledCarousel></StyledCarousel>
      </StyledBodyContainer>
      <Footer />
    </>
  );
}

const StyledBodyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledCarousel = styled.div``;
