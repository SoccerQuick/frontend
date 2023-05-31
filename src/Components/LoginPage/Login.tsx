import { useState, useEffect, FormEvent } from 'react';
import {
  Modal,
  ModalForm,
  ModalInput,
  ModalSubmitButton,
} from '../Commons/Modal';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:9999/users/';

// 더미 데이터 type
type UserProps = {
  key: number | null;
  userId: string;
  password: string;
};

// 로그인용 Modal 컴포넌트 -> 추후 회원가입와 컴포넌트 공용화를 위해 분리 예정
function Login() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [formData, setFormData] = useState<UserProps>({
    key: null,
    userId: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState<boolean>(false); // reduce
  const [loginError, setLoginError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((res) => setUsers(res.data));
    return setUsers([]);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = formData.userId;
    const pw = formData.password;

    if (!id) {
      setLoginError('아이디를 입력해주세요.');
      return;
    } else if (!pw) {
      setLoginError('비밀번호를 입력해주세요.');
      return;
    }

    const check = checkUsers(id, pw);
    if (check) {
      setIsLogin(true);
      setLoginError('');
      navigate('/');
    } else {
      setIsLogin(false);
      setLoginError('존재하지 않는 계정입니다.');
    }
  };

  const checkUsers = (id: string, pw: string) => {
    return users.find((user) => user.userId === id && user.password === pw);
  };

  return (
    <Modal>
      <ModalForm onSubmit={handleSubmit}>
        <ModalInput
          text="이메일"
          name="userId"
          type="text"
          placeholder="이메일을 입력해주세요."
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
