import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import FilteringOptions from './FilteringOptions';

function SubmitPage() {
  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StyledContainer>
        <StyledBox>
          <SelectCategory
            options={FilteringOptions.category}
            defaultValue={FilteringOptions.category[0]}
            styles={SelectStyles}
          />
          <StyledTitle>제목</StyledTitle>
          <StyledInput style={{ width: '40rem' }} />
          <StyledTitle style={{ marginLeft: '4rem' }}>작성자</StyledTitle>
          <StyledDiv style={{ border: '1px solid #eee' }}>ㄱㅁㅇ</StyledDiv>
        </StyledBox>
        {/* 여기에 작성한 후에 Teampage에 컴포넌트로 분리하고 사용. Select의 조건에 따라 불러올 예정 */}
      </StyledContainer>
      <StyledContainer>
        <StyledBox>
          <StyledTitle>활동 지역</StyledTitle>
          <StyledInput />
          <StyledTitle>랜덤매칭 가능여부</StyledTitle>
          <StyledInput />
        </StyledBox>
        <StyledBox>
          <StyledTitle>Player 모집인원</StyledTitle>
          <StyledInput />
          <StyledTitle>GK 모집인원</StyledTitle>
          <StyledInput />
        </StyledBox>
      </StyledContainer>
      <StyledContainer>
        <StyledBox>
          <StyledInput
            style={{ width: '80rem', height: '30rem', verticalAlign: 'top' }}
          />
        </StyledBox>
      </StyledContainer>
    </div>
  );
}

export default SubmitPage;

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
  background-color: beige;
`;

const StyledBox = styled.div`
  display: flex;
  margin: 2rem;
`;
const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 2rem;
  font-size: 1.9rem;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

const StyledInput = styled.input`
  /* display: flex; */
  padding-left: 1rem;
  width: 14rem;
`;

// Select 라이브러리를 사용하여 만든 드롭다운 박스의 스타일 지정
const SelectCategory = styled(Select)`
  width: 14rem;
  font-size: 1.4rem;
`;
// Select 라이브러리에서 사용할 세부 스타일 속성
const SelectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '4px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#38D411' : 'white',
    color: state.isSelected ? 'white' : 'black',
    ':hover': {
      backgroundColor: state.isSelected ? '#38D411' : '#96DF84',
    },
  }),
};
