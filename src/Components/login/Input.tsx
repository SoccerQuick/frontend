import react from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 503px;
  height: 70px;

  &:not(:first-child) {
    margin-top: 24px;
  }
`;

const InputText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #727f88;
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  width: 503px;
  height: 49px;
  background: #ffffff;
  border: 1px solid #e3e5e8;
  border-radius: 8px;
  color: black;

  ::placeholder {
    color: #eeeeee;
  }
`;

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ name, type, placeholder, value, onChange }: InputProps) {
  return (
    <InputBox>
      <InputText>{name}</InputText>
      <StyledInput
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputBox>
  );
}

export default Input;
