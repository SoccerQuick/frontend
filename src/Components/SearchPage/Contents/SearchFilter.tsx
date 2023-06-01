import React, { useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
import FilterlingOptions from '../FilterlingOptions';

function SearchFilter() {
  return (
    <SearchPageOption
      style={{
        float: 'left',
        margin: '1rem 1rem',
      }}
    >
      <div>
        <input type="checkbox"></input>
        <label>풋살화 대여</label>
      </div>
      <div>
        <input type="checkbox"></input>
        <label>남녀 구분 화장실</label>
      </div>
      <div>
        <input type="checkbox"></input>
        <label>공 대여</label>
      </div>
      <div>
        <input type="checkbox"></input>
        <label>조끼 대여</label>
      </div>
      <div>
        <input type="checkbox"></input>
        <label>풋살화 대여</label>
      </div>
      <div>
        <input type="checkbox"></input>
        <label>샤워실</label>
      </div>
      <button onClick={() => {}}>초기화</button>
    </SearchPageOption>
  );
}

export default SearchFilter;

const SearchPageOption = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem;
  padding: 0.5rem 0.5rem;
  font-size: 1.6rem;
  //   justify-content: center;
  //   background-color: skyblue;
  //   align-items: center;
  margin: 10px 10px;
`;
