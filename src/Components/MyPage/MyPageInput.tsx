import react, { useEffect, useState } from 'react';
import { FormData } from '../../Pages/MyPage';
import styled from 'styled-components';

type MyPageInputProps = {
  title: string;
  name: string;
  value: string;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

function MyPageInput({ title, name, value, setFormData }: MyPageInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleChangeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(false);
  };

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  return (
    <StyledInputBox>
      {' '}
      <label>{title}</label>
      <StyledInfoInput
        name={name}
        value={inputValue}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {isDisabled ? (
        <StyledButton onClick={handleChangeButton}>수정</StyledButton>
      ) : (
        <StyledButton onClick={handleCompleteClick}>완료</StyledButton>
      )}
    </StyledInputBox>
  );
}

export default MyPageInput;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: stretch;
  height: 100%;
  width: 50rem;

  & > label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 100%;
    font-weight: bold;
    background-color: #f9f9f9;
    border-right: 1px solid #e5e5e5;
  }

  & > button {
    justify-self: stretch;
  }
`;

const StyledInfoInput = styled.input`
  width: 30rem;
  height: 100%;
  padding-left: 15px;
  outline: none;
  border: none;
  font-size: 1.6rem;
  border-right: 1px solid #e5e5e5;
}
`;

const StyledButton = styled.button`
  width: 10rem;
  height: 5rem;
  font-size: 1rem;
  background-color: #f9f9f9;
`;
