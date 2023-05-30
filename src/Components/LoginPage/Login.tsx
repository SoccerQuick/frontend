import { useState } from 'react';
import styled from 'styled-components';
import { Modal, Input } from '../Commons/Modal';

const LoginButton = styled.button`
  width: 503px;
  height: 49px;
  background: #09cf00;
  border-radius: 8px;
  color: #fff;
  margin-top: 32px;
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
    </Modal>
  );
}

export default Login;
