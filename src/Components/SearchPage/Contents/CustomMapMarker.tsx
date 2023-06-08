import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const CustomMapMarker = ({ title }: { title: string }) => {
  return (
    <div style={{ height: '10rem', position: 'relative' }}>
      <A>
        <B>
          <img src="Images/markerIcon.svg" alt="" />
        </B>
        <C>{title}</C>
        <AA></AA>
        <BB></BB>
      </A>
    </div>
  );
};

export default CustomMapMarker;

const A = styled.div`
  margin: 0;
  display: table;
  padding: 0.5rem;
  table-layout: auto;
  border-radius: 2.3rem;
  border: 0.2rem solid var(--color--darkgreen);
  background: white;
  cursor: pointer;
  position: relative;
`;
const B = styled.div`
  display: table-cell;
  display: inline-block;
  width: 4rem;
  height: 4rem;
`;
const C = styled.div`
  max-width: 23rem;
  height: 4rem;
  padding: 0 0.8rem 0 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  font-size: 1.5rem;
  letter-spacing: -0.04rem;
  font-weight: 600;
  line-height: 4rem;
`;

const AA = styled.span`
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 1.2rem 1rem 0 1rem;
  border-color: #ffffff transparent;
  display: block;
  width: 0;
  z-index: 1;
  top: 4.8rem;
  left: 1.4rem;
`;

const BB = styled.span`
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 1.2rem 1rem 0 1rem;
  border-color: var(--color--darkgreen) transparent;
  display: block;
  width: 0;
  z-index: 0;
  top: 5.05rem;
  left: 1.4rem;
`;
