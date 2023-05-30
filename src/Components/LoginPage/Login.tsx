import { useState } from 'react';
import { Modal, ModalInput, ModalButton } from '../Commons/Modal';

// 안뇽

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
      userId: 'abc',
      password: 1234,
    },
    {
      userId: 'ababcc',
      password: 1234,
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
      <ModalInput
        name="이메일"
        type="email"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChange={handleEmailChange}
      />
      <ModalInput
        name="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={handlePasswordChange}
      />
      <ModalButton>로그인</ModalButton>
    </Modal>
  );
}

export default Login;
