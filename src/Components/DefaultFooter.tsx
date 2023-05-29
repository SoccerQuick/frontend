import React from 'react';
import styled from 'styled-components';

// footer가 완성되기 전에 임시로 사용할 footer components
function DefaultFooter() {
  return <Footer>푸터</Footer>;
}

export default DefaultFooter;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: beige;
`;
