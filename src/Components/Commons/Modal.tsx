import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ModalBox = styled.div`
  position: absolute;
  width: 583px;
  height: 501px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fdfdfd;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
`;

const Logo = styled.img``;

const FormBox = styled.form``;

const BottomLine = styled.div`
  width: 503px;
  height: 0px;
  border: 1px solid #e3e5e8;
  margin-top: 24px;
`;

const ModalTextBox = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin-top: 24px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #898f9c;

  & > a {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-decoration: underline;
    margin-left: 10px;
    color: #09cf00;
  }
`;

// input styled-components
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

// input이 받게 될 데이터 type
type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// input 컴포넌트
export function Input({
  name,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
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

// modal 컴포넌트
export function Modal(props: { children: React.ReactNode }) {
  return (
    <ModalBox>
      <Logo src="./Images/soccerquick-logo.png" alt="logo image" />
      <FormBox>{props.children}</FormBox>
      <BottomLine />
      <ModalTextBox>
        아직 아이디가 없으신가요?
        <Link to="/">회원가입 하기</Link>
      </ModalTextBox>
    </ModalBox>
  );
}
