import React from 'react';
import styled from 'styled-components';

// header가 완성되기 전에 임시로 사용할 header components
function DefaultHeader() {
  return <Header>헤더</Header>;
}

export default DefaultHeader;

const Header = styled.div`
  display: flex;
  height: 50px;
  background-color: skyblue;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
`;
