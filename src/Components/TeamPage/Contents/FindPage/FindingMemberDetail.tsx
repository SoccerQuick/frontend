import React from 'react';
import styled from 'styled-components';

function FindingMemberDetail(props: any) {
  const modalData = props.modalData;
  return (
    <>
      <StyledDiv>
        <div style={{ padding: '0rem 2rem' }}>모집인원</div>
        <div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            골키퍼 {modalData.gk_need} 명
          </div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            필드플레이어 {modalData.player_need} 명
          </div>
        </div>
      </StyledDiv>
      <StyledSecondDiv>
        <div style={{ padding: '0rem 2rem' }}>현재인원</div>
        <div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            골키퍼 : {modalData.gk.join(' ')} (잔여{' '}
            {modalData.gk_need - modalData.gk.length}명)
          </div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            필드플레이어 : {modalData.player.join(' ')} (잔여{' '}
            {modalData.player_need - modalData.player.length}명)
          </div>
        </div>
      </StyledSecondDiv>
      <StyledThirdDiv>
        <div style={{ padding: '0rem 2rem' }}>랜덤매칭</div>
        <div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            {modalData.allowRandom}
          </div>
        </div>
      </StyledThirdDiv>
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

export default FindingMemberDetail;

const StyledDiv = styled.div`
  z-index: 902;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 15rem;
  width: 90%;
  height: 10%;
  border: 1px solid #dddddd;
  border-radius: 1rem;
`;

const StyledSecondDiv = styled.div`
  z-index: 902;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 23rem;
  width: 90%;
  height: 10%;
  border: 1px solid #dddddd;
  border-radius: 1rem;
`;

const StyledThirdDiv = styled.div`
  z-index: 902;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 31rem;
  width: 90%;
  height: 10%;
  border: 1px solid #dddddd;
  border-radius: 1rem;
`;

const StyledBodyContainer = styled.div`
  z-index: 902;
  display: flex;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 40rem;
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
  /* border: 1px solid #dddddd; */
  border-radius: 1rem;
`;

const StyledButton = styled.button`
  z-index: 903;
  margin: 0rem 4rem;
  height: 4rem;
  border-radius: 2rem;
`;
