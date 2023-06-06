import react, { useState, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormData } from '../../Pages/MyPage';
import MyPageInput from './MyPageInput';

type MyPageInfoProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export type NewFormData = {
  user_id: string;
  name: string;
  password: string;
  nick_name: string;
  email: string;
  phone_number: string;
  gender?: string;
};

export function MyPageInfo({ formData, setFormData }: MyPageInfoProps) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch(
        'http://localhost:8800/user',
        {
          user_id: formData.user_id,
          name: formData.name,
          password: '12341234a',
          nick_name: formData.nick_name,
          email: formData.email,
          phone_number: formData.phone_number,
          gender: formData.gender,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        alert(res.data);
        console.log(res.data);
        setErrorMsg('');
        // 성공적으로 수정되었을 때 처리 로직 추가
      })
      .catch((err) => setErrorMsg(err.response.data.message));
  };

  return (
    <>
      {' '}
      <StyledInfoBox>
        {' '}
        <StyledTitle>내 정보</StyledTitle>
        <StyledInfoForm onSubmit={handleSubmit}>
          <MyPageInput
            title="아이디"
            name="user_id"
            value={formData.user_id}
            setFormData={setFormData}
          />
          <MyPageInput
            title="이름"
            name="name"
            value={formData.name}
            setFormData={setFormData}
          />
          <MyPageInput
            title="닉네임"
            name="nick_name"
            value={formData.nick_name}
            setFormData={setFormData}
          />
          <MyPageInput
            title="이메일"
            name="email"
            value={formData.email}
            setFormData={setFormData}
          />
          <MyPageInput
            title="전화번호"
            name="phone_number"
            value={formData.phone_number}
            setFormData={setFormData}
          />
          <MyPageInput
            title="성별"
            name="gender"
            value={formData.gender}
            setFormData={setFormData}
          />
          <StyledSubmitButton>완료</StyledSubmitButton>
        </StyledInfoForm>
        <div style={{ color: 'red', marginTop: '1rem' }}>{errorMsg}</div>
      </StyledInfoBox>
    </>
  );
}

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 60rem;
  background: rgb(253, 253, 253);
  border-radius: 16px;
`;

const StyledTitle = styled.div`
  align-self: flex-start;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 2rem 5rem;
  width: 8rem;
  border-bottom: 3px solid #e5e5e5;
`;

const StyledInfoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70%;
`;

const StyledSubmitButton = styled.button`
  align-self: end;
  width: 8rem;
  margin-top: 1rem;
  font-size: 1rem;
  background-color: #09cf00;
  color: #fff;
`;
