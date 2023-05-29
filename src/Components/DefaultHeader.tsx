import React from 'react';
import styled from 'styled-components';

// header가 완성되기 전에 임시로 사용할 header components
function DefaultHeader() {
  return <Header>헤더</Header>;
}

export default DefaultHeader;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: beige;
`;
