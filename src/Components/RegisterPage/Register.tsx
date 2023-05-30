import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react';
import styled from 'styled-components';
import {
  Modal,
  ModalInput,
  ModalSubmitButton,
  ModalButton,
  ModalSelectBox,
  ModalTerms,
  ModalForm,
} from '../Commons/Modal';

type RegisterProps = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  phonenumber: string;
  gender: string;
  term: boolean;
};

function Register() {
  const [formData, setFormData] = useState<RegisterProps>({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    phonenumber: '',
    gender: '',
    term: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };
  const handleTermCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formData.term) {
      setFormData((prevData) => ({
        ...prevData,
        term: false,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        term: true,
      }));
    }
  };

  const handleDoubleCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Modal long register>
      <ModalForm onSubmit={handleSubmit}>
        <EmailCheck>
          <ModalInput
            text="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={formData.email}
            onChange={handleChange}
          />
          <ModalButton onClick={handleDoubleCheck}>중복 확인</ModalButton>
        </EmailCheck>
        <ModalInput
          text="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={handleChange}
        />
        <ModalInput
          text="비밀번호 확인"
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.passwordCheck}
          onChange={handleChange}
        />
        <ModalInput
          text="이름"
          name="name"
          type="text"
          placeholder="이름을 입력해주세요."
          value={formData.name}
          onChange={handleChange}
        />
        <ModalInput
          text="전화번호"
          name="phonenumber"
          type="tel"
          placeholder="전화번호를 입력해주세요."
          value={formData.phonenumber}
          onChange={handleChange}
        />
        <ModalSelectBox
          value={formData.gender}
          onChange={handleGenderChange}
          options={[
            { value: '남', label: '남' },
            { value: '여', label: '여' },
          ]}
        />
        <ModalTerms onClick={handleTermCheck} term={formData.term}>
          플랩풋볼 서비스 이용 약관 및 개인 정보 수집 및 이용에 동의합니다.
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
