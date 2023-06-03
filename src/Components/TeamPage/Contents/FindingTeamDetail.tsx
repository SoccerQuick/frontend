import React from 'react';
import styled from 'styled-components';

function FindingTeamDetail(props: any) {
  const modalData = props.modalData;
  return (
    <>
      <StyledDiv>
        <div style={{ padding: '0rem 2rem' }}>작성자 정보</div>
        <div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            포지션 : {modalData.position}
          </div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            실력 : {modalData.skill}
          </div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            성별 : {modalData.gender}
          </div>
        </div>
      </StyledDiv>
      <StyledBodyContainer>
        <StyledBody>{modalData.body}</StyledBody>
      </StyledBodyContainer>
      <StyledButtonContainer>
        <StyledButton>신청하기</StyledButton>
        <StyledButton>조회하기</StyledButton>
      </StyledButtonContainer>
    </>
  );
}

export default FindingTeamDetail;

const StyledDiv = styled.div`
  z-index: 902;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 15rem;
  width: 90%;
  height: 20%;
  border: 1px solid #dddddd;
  border-radius: 1rem;
`;

const StyledBodyContainer = styled.div`
  z-index: 902;
  display: flex;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 31rem;
  width: 90%;
  height: 30%;
  border: 1px solid #dddddd;
  border-radius: 1rem;
`;

const StyledBody = styled.div`
  z-index: 902;
  display: flex;
  font-size: 1.8rem;
  margin: 1rem 1rem;
  padding: 1rem 1rem;
`;

const StyledButtonContainer = styled.div`
  z-index: 902;
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  position: absolute;
  top: 0;
  margin-top: 64rem;
  width: 90%;
  border-radius: 1rem;
`;

const StyledButton = styled.button`
  z-index: 903;
  margin: 0rem 4rem;
  height: 4rem;
  border-radius: 2rem;
`;
