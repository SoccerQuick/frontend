import { useState } from 'react';
import styled from 'styled-components';
import {
  Modal,
  ModalInput,
  ModalButton,
  ModalSelectBox,
  ModalTerms,
} from '../Commons/Modal';

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

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  return (
    <Modal long register>
      <EmailCheck>
        <ModalInput
          name="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleEmailChange}
        />
        <ModalButton>중복 확인</ModalButton>
      </EmailCheck>
      <ModalInput
        name="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={handlePasswordChange}
      />
      <ModalInput
        name="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={passwordCheck}
        onChange={handlePasswordCheckChange}
      />
      <ModalInput
        name="이름"
        type="text"
        placeholder="이름을 입력해주세요."
        value={name}
        onChange={handleNameChange}
      />
      <ModalInput
        name="전화번호"
        type="text"
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
      <ModalTerms>
        플랩풋볼 서비스 이용 약관 및 개인 정보 수집 및 이용에 동의합니다.
      </ModalTerms>
      <RegisterText>
        회원가입 시 <span>매치 찜하기</span> 기능과 <span>싸커퀵 커뮤니티</span>
        를 이용할 수 있어요.
      </RegisterText>
      <ModalButton>회원가입</ModalButton>
    </Modal>
  );
}

export default Register;
