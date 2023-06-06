import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import teamIcon from '../../../styles/icon/team.svg';
import memberIcon from '../../../styles/icon/member.svg';

type props = {
  findingTeam: boolean;
  findingMember: boolean;
  setFindingMember: React.Dispatch<React.SetStateAction<boolean>>;
  setFindingTeam: React.Dispatch<React.SetStateAction<boolean>>;
};

function FindPage(props: props) {
  const { setFindingMember, setFindingTeam } = props;

  return (
    <div style={{ width: '100%' }}>
      <StyledDiv>
        <Link to="/teampage/team">
          <StyledButton
            onClick={() => {
              setFindingMember(true);
              setFindingTeam(false);
            }}
          >
            <StyledImg>
              <img
                src={memberIcon}
                alt="팀원 구해요"
                title="팀원 모집 사이트로 이동"
              />
            </StyledImg>

            <StyledButtonText>팀원 구하기</StyledButtonText>
          </StyledButton>
        </Link>
        <Link to="/teampage/player">
          <StyledButton
            onClick={() => {
              setFindingMember(false);
              setFindingTeam(true);
            }}
          >
            <StyledImg>
              <img
                src={teamIcon}
                alt="팀 구해요"
                title="팀 구직 사이트로 이동"
              />
            </StyledImg>
            <StyledButtonText>팀 구하기</StyledButtonText>
          </StyledButton>
        </Link>
      </StyledDiv>
    </div>
  );
}

export default FindPage;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 16rem auto;
  width: 70rem;
`;

const StyledButton = styled.button`
  height: 23rem;
  width: 23rem;
  background: transparent;
  :hover {
    div:first-child {
      filter: drop-shadow(0 0 1rem #93d663);
    }
    div:last-child {
      color: var(--color--green);
    }
  }
`;

const StyledImg = styled.div`
  height: 23rem;
  width: 23rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  filter: drop-shadow(0 0 0.5rem #d8d3d3);

  img {
    height: 12rem;
    width: 12rem;
  }
`;

const StyledButtonText = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  color: #6a6a6a;
  margin-top: 4rem;
  text-align: center;
  width: 23rem;
`;
