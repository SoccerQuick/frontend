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
const getUserUrl = 'http://localhost:8800/user'; // 이메일 입력시 유저id가 중복인지 체크할 api

// 회원가입 양식 정보 type
type RegisterFormProps = {
  user_id: string;
  password: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
};

function Register() {
  // 회원가입 정보를 서버로 보내는 상태 변수
  const [formData, setFormData] = useState<RegisterFormProps>({
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
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [termCheck, setTermCheck] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // 양식 확인인데 일반 보류
  // const [isUserId, setIsUserId] = useState<boolean>(false);
  // const [isPassword, setIsPassword] = useState<boolean>(false);
  // const [isName, setIsName] = useState<boolean>(false);
  // const [isNickname, setIsNickname] = useState<boolean>(false);
  // const [isEmail, setIsEmail] = useState<boolean>(false);
  // const [isPhonenumber, setIsPhonenumber] = useState<boolean>(false);
  // const [isGender, setIsGender] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserId(e.target.value);
  };

  const handleUserIdCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get(`${getUserUrl}/${userId}`)
      .then((res) => res.data)
      .then((result) => {
        if (result) {
          alert('이미 존재하는 아이디입니다.');
        }
      })
      .catch(() => alert('사용 가능한 아이디입니다.'));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {};

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

    setFormData((prev) => ({
      ...prev,
      user_id: userId,
      password: password,
      name: name,
      nick_name: nickname,
      email: email,
      phone_number: phonenumber,
    }));

    // axios
    //   .post(postSignupUrl, formData)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.error(err));

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
        alert(data.message);
        setErrorMsg('');
        navigate('/login');
      })
      .catch((error) => {
        // 오류 처리
        console.error(error);
        setErrorMsg(error.message);
      });
  };

  return (
    <Modal long register>
      <ModalForm onSubmit={handleSubmit}>
        <EmailCheck>
          <ModalInput
            text="아이디"
            name="userId"
            type="text"
            placeholder="아이디를 입력해주세요."
            value={userId}
            onChange={handleUserIdChange}
          />
          <ModalButton onClick={handleUserIdCheck}>
            중복확인
            {/* {formCheck.isEmailCheck ? '✔' : '중복확인'} */}
          </ModalButton>
        </EmailCheck>
        <ModalInput
          text="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={handlePasswordChange}
        />
        <ModalInput
          text="비밀번호 확인"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={passwordCheck}
          onChange={handlePasswordCheck}
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
      </ModalForm>
    </Modal>
  );
}

export default Register;

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
