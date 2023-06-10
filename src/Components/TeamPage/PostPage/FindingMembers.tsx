import React from 'react';
import styled from 'styled-components';

interface Props {
  gk: number;
  gkNeed: number;
  player: number;
  playerNeed: number;

  setPlayer: React.Dispatch<React.SetStateAction<number>>;
  setGk: React.Dispatch<React.SetStateAction<number>>;
  setPlayerNeed: React.Dispatch<React.SetStateAction<number>>;
  setGkNeed: React.Dispatch<React.SetStateAction<number>>;
}

function FindingMembers(props: Props) {
  const {
    gk,
    setGk,
    gkNeed,
    setGkNeed,
    player,
    setPlayer,
    playerNeed,
    setPlayerNeed,
  } = props;

  return (
    <StyledBox>
      <StyledTitle>GK 현재인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        defaultValue={gk}
        min={0}
        onChange={(e) => {
          setGk(parseInt(e.target.value));
        }}
      />
      <StyledTitle>GK 모집인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        defaultValue={gkNeed}
        min={0}
        onChange={(e) => {
          setGkNeed(parseInt(e.target.value));
        }}
      />
      <StyledTitle>Player 현재인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        defaultValue={player}
        min={0}
        onChange={(e) => {
          setPlayer(parseInt(e.target.value));
        }}
      />
      <StyledTitle>Player 모집인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        defaultValue={playerNeed}
        min={0}
        onChange={(e) => {
          setPlayerNeed(parseInt(e.target.value));
        }}
      />
    </StyledBox>
  );
}

export default FindingMembers;

const StyledBox = styled.div`
  display: flex;
  margin-top: 0rem;
`;
const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 2rem;
  font-size: 1.9rem;
`;

const StyledInputNumber = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 6rem;
  height: 4rem;
  text-align: center;
`;
