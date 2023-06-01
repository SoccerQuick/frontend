import { useState, FormEvent } from 'react';
import {
  Modal,
  ModalForm,
  ModalInput,
  ModalSubmitButton,
} from '../Commons/Modal';
import axios from 'axios';
import styled from 'styled-components';

const postLoginUrl = 'http://localhost:8800/auth/login';

// 로그인 요청 type
type UserProps = {
  userId: string;
  password: string;
};

// Login 컴포넌트가 받는 props type
type LoginProps = {
  handleIsLogin: (e: React.MouseEvent<HTMLDivElement>) => void;
  setAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// 로그인 Modal 컴포넌트
function Login({ handleIsLogin, setAuthModal }: LoginProps) {
  const [formData, setFormData] = useState<UserProps>({
    userId: '',
    password: '',
  });
  const [loginError, setLoginError] = useState<string>('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      user_id: formData.userId,
      password: formData.password,
    };

    if (!data.user_id) {
      setLoginError('아이디를 입력해주세요.');
      return;
    } else if (!data.password) {
      setLoginError('비밀번호를 입력해주세요.');
      return;
    }

    checkUsers(data);
  };

  // 아이디, 비번이 db안에 있으면 로그인 안되면 에러 메세지 표기
  const checkUsers = (data: { user_id: string; password: string }) => {
    axios
      .post(postLoginUrl, data)
      .then((res) => {
        console.log(res.data);
        setLoginError('');
        setAuthModal(false);
      })
      .catch((err) => {
        console.log(err);
        setLoginError('존재하지 않는 계정입니다.');
      });
  };

  return (
    <Modal onClick={handleIsLogin}>
      <ModalForm onSubmit={handleSubmit}>
        <ModalInput
          text="아이디"
          name="userId"
          type="text"
          placeholder="아이디를 입력해주세요."
          value={formData.userId}
          onChange={handleFormChange}
        />
        <ModalInput
          text="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={handleFormChange}
        />
        {loginError && <LoginError>{loginError}</LoginError>}
        <ModalSubmitButton>로그인</ModalSubmitButton>
      </ModalForm>
    </Modal>
  );
}

export default Login;

const LoginError = styled.div`
  margin-top: 15px;
  align-self: start;
  font-size: 14px;
  line-height: 16px;
  color: #ff003e;
`;
