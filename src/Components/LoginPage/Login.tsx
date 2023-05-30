import react, { useState } from 'react';
import Input from './Input';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Modal = styled.div`
  position: absolute;
  width: 583px;
  height: 501px;
  left: 428.49px;
  top: 153.28px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fdfdfd;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
`;

const Logo = styled.div`
  width: 503px;
  height: 60px;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  color: #09cf00;
`;

const FormBox = styled.form``;

const LoginButton = styled.button`
  width: 503px;
  height: 49px;
  background: #09cf00;
  border-radius: 8px;
  color: #fff;
  margin-top: 32px;
`;

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

// 더미 데이터 type
type User = {
  key: number;
  id: string;
  pw: string;
};

type Props = {
  users: User[];
};

// 더미 데이터
Login.defaultProps = {
  users: [
    {
      key: 1,
      id: 'abc',
      pw: 1234,
    },
  ],
};

// 로그인용 Modal 컴포넌트 -> 추후 회원가입와 컴포넌트 공용화를 위해 분리 예정
function Login({ users }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Modal>
      <Logo>싸커퀵</Logo>
      <FormBox>
        <Input
          name="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          name="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handlePasswordChange}
        />
        <LoginButton>로그인</LoginButton>
      </FormBox>
      <BottomLine />
      <ModalTextBox>
        아직 아이디가 없으신가요?
        <Link to="/">회원가입 하기</Link>
      </ModalTextBox>
    </Modal>
  );
}

export default Login;
