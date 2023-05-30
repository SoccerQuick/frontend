import React from 'react';
import styled from 'styled-components';

// footer가 완성되기 전에 임시로 사용할 footer components
function DefaultFooter() {
  return <Footer>푸터</Footer>;
}

export default DefaultFooter;

const Footer = styled.div`
  display: flex;
  height: 50px;
  background-color: skyblue;
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
`;
