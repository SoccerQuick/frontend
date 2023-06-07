import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import SearchIcon from '../../styles/icon/search.svg';

const HeaderSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const pressEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      navigate('/ground', { state: searchValue });
    }
  };

  return (
    <HeaderSearchBar>
      <img src={SearchIcon} alt="search" />
      <input
        type="search"
        placeholder="지역으로 풋살장 찾기"
        maxLength={100}
        value={searchValue}
        onChange={(e) => searchHandler(e)}
        onKeyDown={(e) => pressEnterHandler(e)}
      />
    </HeaderSearchBar>
  );
};

export default HeaderSearch;

const HeaderSearchBar = styled.div`
  width: 35rem;
  height: 4rem;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0.8rem;
  display: inline-block;
  border-radius: 0.6rem;
  input {
    color: #3e5463;
    font-size: 1.4rem;
    border: none;
    background: none;
    width: 85%;
    padding: 0 0 0 1rem;
    line-height: 2.5rem;
  }
`;
