import react, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormData } from '../../Pages/MyPage';

type MyPageInfoProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

function MyPageInfo({ formData, setFormData }: MyPageInfoProps) {
  const [values, setValues] = useState({
    user_id: formData.user_id ?? null,
    name: formData.name ?? null,
    password: '12341234a',
    nick_name: formData.nickname ?? null,
    email: formData.email ?? null,
    phone_number: formData.phonenumber ?? null,
    gender: formData.gender ?? '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch('http://localhost:8800/user', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        alert(res.data);
        setErrorMsg('');
        // 성공적으로 수정되었을 때 처리 로직 추가
      })
      .catch((err) => setErrorMsg(err.response.data.message));
  };

  return (
    <StyledInfoBox>
      {' '}
      <StyledTitle>내 정보</StyledTitle>
      <StyledInfoForm onSubmit={handleSubmit}>
        <StyledInputBox>
          {' '}
          <label>아이디</label>
          <StyledInfoInput
            name="user_id"
            value={values.user_id}
            placeholder="아이디"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>이름</label>
          <StyledInfoInput
            name="name"
            value={values.name}
            placeholder="이름"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>닉네임</label>
          <StyledInfoInput
            name="nick_name"
            value={values.nick_name}
            placeholder="닉네임"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>이메일</label>
          <StyledInfoInput
            name="email"
            value={values.email}
            placeholder="이메일"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>핸드폰 번호</label>
          <StyledInfoInput
            name="phone_number"
            value={values.phone_number}
            placeholder="핸드폰 번호"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>성별</label>
          <StyledInfoInput name="gender" value={values.gender} disabled />
          <StyledChangeButton type="submit">완료</StyledChangeButton>
        </StyledInputBox>
      </StyledInfoForm>
      <div style={{ color: 'red', marginTop: '1rem' }}>{errorMsg}</div>
      {/* <StyledTitle>비밀번호 변경</StyledTitle>
      <StyledInfoForm onSubmit={handleSubmit}>
        <StyledInputBox>
          {' '}
          <label>비밀번호</label>
          <StyledInfoInput
            name="user_id"
            value={values.user_id}
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
          />
          <StyledChangeButton></StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>비밀번호 확인</label>
          <StyledInfoInput
            name="name"
            value={values.name}
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={handleChange}
          />
          <StyledChangeButton>완료</StyledChangeButton>
        </StyledInputBox>
      </StyledInfoForm> */}
    </StyledInfoBox>
  );
}

export default MyPageInfo;

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
  width: 25%;
  border-bottom: 3px solid #e5e5e5;
`;

const StyledInfoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70%;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: stretch;
  height: 100%;
  width: 50rem;

  & > label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 100%;
    font-weight: bold;
    background-color: #f9f9f9;
    border-right: 1px solid #e5e5e5;
  }

  & > button {
    justify-self: stretch;
  }
`;

const StyledInfoInput = styled.input`
  width: 30rem;
  height: ;
  outline: none;
  border: none;
`;

const StyledChangeButton = styled.button`
  width: 10rem;
  height: 5rem;
  background-color: #fff;
`;
