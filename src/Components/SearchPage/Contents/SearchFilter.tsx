import React, { useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';

function SearchFilter(props: any) {
  // 버튼의 상태를 관리할 변수
  const [buttonStates, setButtonStates] = React.useState(
    Array(items.length).fill(false)
  );

  // 선택된 버튼을 필터링 옵션에 추가하는 함수. state를 분리하지 않고 만들 수 있는지 생각 필요함.
  React.useEffect(() => {
    const filter = [];
    for (let idx in items) {
      if (buttonStates[idx]) {
        filter.push(items[idx]);
      }
    }
    props.setFilterOption(filter);
  }, [buttonStates]);

  // 버튼의 클릭여부를 변동시킬 onclick함수
  const handleButtonClick = (index: number) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
  };

  return (
    <>
      <SearchPageOption>
        {items.map((item, index) => (
          <StyledTable
            key={index}
            data={item}
            active={buttonStates[index]}
            onClick={() => handleButtonClick(index)}
          >
            {item}
          </StyledTable>
        ))}
        <ResetButton
          onClick={() => setButtonStates(Array(items.length).fill(false))}
        >
          초기화
        </ResetButton>
      </SearchPageOption>
    </>
  );
}

export default SearchFilter;

const items = [
  '풋살화 대여',
  '남녀 구분 화장실',
  '공 대여',
  '조끼 대여',
  '무료 주차',
  '샤워실',
];

// Left Bar
const SearchPageOption = styled.div`
  display: flex;
  float: left;
  flex-direction: column;
  margin: 0.5rem 0.5rem;
  padding: 0.5rem 0.5rem;
  font-size: 1.6rem;
  border: 0.2rem solid #dddddd;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
`;

const StyledTable = styled.button<{ data: string; active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  padding: 0.3rem 0.7rem;
  margin: 0.4rem 0.7rem;
  border: ${({ active, data }) =>
    active ? `0.3rem solid ${getColorBydata(data)}` : '0.1rem solid #EEEEEE'};
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ data }) => getColorBydata(data)};
  background-color: ${({ active }) => (active ? '#EEEEEE' : '#f3f1ff')};
`;

const getColorBydata = (data: string) => {
  if (data === '풋살화 대여') {
    return '#7a6fce';
  } else if (data === '남녀 구분 화장실') {
    return '#98212b';
  } else if (data === '공 대여') {
    return '#009e5c';
  } else if (data === '조끼 대여') {
    return 'green';
  } else if (data === '무료 주차') {
    return 'skyblue';
  } else if (data === '샤워실') {
    return 'blue';
  }
};

const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin: 1rem 1rem;
`;
