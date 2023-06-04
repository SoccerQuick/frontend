import React from 'react';
import styled from 'styled-components';
import DropDown from '../../../Commons/DropDown';
import FilteringOptions from '../../../Commons/FilteringOptions';

type Props = {
  gender: string;
  skill: string;
  position: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setSkill: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
};

function FindingTeam(props: Props) {
  const { gender, setGender, skill, setSkill, position, setPosition } = props;

  return (
    <StyledBox>
      <StyledTitle>포지션</StyledTitle>
      <DropDown
        list={FilteringOptions.findingTeam.position}
        selected={position}
        setSelected={setPosition}
      />
      <StyledTitle>실력</StyledTitle>
      <DropDown
        list={FilteringOptions.findingTeam.skill}
        selected={skill}
        setSelected={setSkill}
      />
      <StyledTitle>성별</StyledTitle>
      <DropDown
        list={FilteringOptions.findingTeam.gender}
        selected={gender}
        setSelected={setGender}
      />
    </StyledBox>
  );
}

export default FindingTeam;

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

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

const StyledInputText = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 9rem;
  height: 4rem;
  text-align: center;
  align-items: center;
`;

const StyledInputNumber = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 6rem;
  height: 4rem;
  text-align: center;
`;

const StyledButton = styled.button`
  margin: 6rem 3rem 0rem 3rem;
`;
