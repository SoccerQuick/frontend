import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalInput,
  ModalSubmitButton,
  ModalButton,
  ModalSelectBox,
  ModalTerms,
  ModalForm,
} from '../Commons/Modal';

const postSignupUrl = 'http://localhost:8800/auth/signup'; // 회원가입 정보를 보낼 api
const postIdCheckUrl = 'http://localhost:8800/auth/id-check'; // 이메일 입력시 유저id가 중복인지 체크할 api

// Signup 컴포넌트가 받는 props type
type SignupProps = {
  handleIsLogin: (e: React.MouseEvent<HTMLDivElement>) => void;
};

// 회원가입 양식 정보 type
type SignupFormProps = {
  user_id: string;
  password: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
};

function Signup({ handleIsLogin }: SignupProps) {
  // 회원가입 정보를 서버로 보내는 상태 변수
  const [formData, setFormData] = useState<SignupFormProps>({
    user_id: '',
    password: '',
    name: '',
    nick_name: '',
    email: '',
    phone_number: '',
  });

  // 회원가입 양식에 맞게 입력했는지 체크하는 상태관리
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [termCheck, setTermCheck] = useState<boolean>(false);

  const [checkUserId, setCheckUserId] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);

  const [userIdMsg, setUserIdMsg] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [responseMsg, setResponseMsg] = useState<string>('');

  useEffect(() => {
    if (!password || !passwordConfirm) {
      setPasswordMsg('');
    } else if (password === passwordConfirm) {
      setPasswordMsg('비밀번호가 일치합니다!');
      setCheckPassword(true);
    } else {
      setPasswordMsg('비밀번호가 일치하지 않습니다!');
      setCheckPassword(false);
    }
    return () => {};
  }, [password, passwordConfirm]);

  useEffect(() => {
    if (userIdMsg.includes('사')) {
      setCheckUserId(true);
    } else {
      setCheckUserId(false);
    }
  }, [userIdMsg]);

  useEffect(() => {
    // fetch 버전
    fetch(postSignupUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 올바른 Content-Type 형식으로 수정
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // 요청에 대한 응답 처리
        if (data.statusCode === 400) {
          setResponseMsg(data.message);
        } else {
          alert(data.message);
          navigate('/login');
        }
      })
      .catch((error) => {
        // 오류 처리
        alert(error.message);
      });
  }, [formData]);

  const navigate = useNavigate();

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserId(e.target.value);
    setUserIdMsg('');
  };

  const handleUserIdCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`${postIdCheckUrl}`, { user_id: userId })
      .then((res) => res.data)
      .then((result) => {
        setUserIdMsg(() => result.message);
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordConfirm(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhonenumber(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setGender(e.target.value);
  };

  const handleTermCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (termCheck) {
      setTermCheck(false);
    } else {
      setTermCheck(true);
    }
  };

  // 서버로 회원정보 전송
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkUserId) {
      setResponseMsg('아이디 입력 후 중복 체크를 진행해주세요.');
      return;
    } else if (!checkPassword) {
      setResponseMsg('비밀번호와 비밀번호 확인을 동일하게 입력해주세요.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      user_id: userId,
      password: password,
      name: name,
      nick_name: nickname,
      email: email,
      phone_number: phonenumber,
    }));
  };

  return (
    <Modal long register onClick={handleIsLogin}>
      <ModalForm onSubmit={handleSubmit}>
        <EmailCheck>
          <ModalInput
            text="아이디"
            name="userId"
            type="text"
            placeholder="아이디를 입력해주세요."
            value={userId}
            onChange={handleUserIdChange}
            message={userIdMsg}
            check={checkUserId}
          />
          <ModalButton onClick={handleUserIdCheck}>
            {checkUserId ? '✔' : '중복확인'}
          </ModalButton>
        </EmailCheck>
        <ModalInput
          text="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요. (8자이상, 숫자/영소문자 포함)"
          value={password}
          onChange={handlePasswordChange}
        />
        <ModalInput
          text="비밀번호 확인"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          value={passwordConfirm}
          onChange={handlePasswordCheck}
          message={passwordMsg}
          check={checkPassword}
        />
        <ModalInput
          text="이름"
          name="name"
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={handleNameChange}
        />
        <ModalInput
          text="별명"
          name="nickname"
          type="text"
          placeholder="별명을 입력해주세요."
          value={nickname}
          onChange={handleNicknameChange}
        />
        <ModalInput
          text="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleEmailChange}
        />
        <ModalInput
          text="전화번호"
          name="phonenumber"
          type="tel"
          placeholder="전화번호를 입력해주세요."
          value={phonenumber}
          onChange={handlePhoneNumberChange}
        />
        <ModalSelectBox
          value={gender}
          onChange={handleGenderChange}
          options={[
            { value: '남', label: '남' },
            { value: '여', label: '여' },
          ]}
        />
        <ModalTerms onClick={handleTermCheck} term={termCheck}>
          Soccer-Quick 서비스 이용 약관 및 개인 정보 수집 및 이용에 동의합니다.
        </ModalTerms>
        <RegisterText>
          회원가입 시 <span>매치 찜하기</span> 기능과{' '}
          <span>싸커퀵 커뮤니티</span>를 이용할 수 있어요.
        </RegisterText>
        <ModalSubmitButton>회원가입</ModalSubmitButton>
        <ResponseText>{responseMsg}</ResponseText>
      </ModalForm>
    </Modal>
  );
}

export default Signup;

const EmailCheck = styled.div`
  display: flex;
  flex-direction: columns;
  width: 503px;

  & input {
    flex: 3;
    max-width: 394px;
  }

  & button {
    flex: 1;
    margin: 0;
    align-self: flex-end;
    min-width: 101px;
  }
`;

const RegisterText = styled.div`
  align-self: start;
  margin-top: 25px;
  color: #898f9c;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  & > span {
    color: #09cf00;
  }
`;

const ResponseText = styled.div`
  margin-top: 25px;
  color: #898f9c;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;
