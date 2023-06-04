import react, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormData } from '../../Pages/MyPage';

type MyPageInfoProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

function MyPageInfo({ formData, setFormData }: MyPageInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <StyledInfoBox>
      {' '}
      <StyledInfoForm>
        <StyledInputBox>
          {' '}
          <label>아이디</label>
          <StyledInfoInput
            value={formData.user_id}
            placeholder="아이디"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>이름</label>
          <StyledInfoInput
            value={formData.name}
            placeholder="이름"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>닉네임</label>
          <StyledInfoInput
            value={formData.nickname}
            placeholder="닉네임"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>이메일</label>
          <StyledInfoInput
            value={formData.email}
            placeholder="이메일"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>핸드폰 번호</label>
          <StyledInfoInput
            value={formData.phonenumber}
            placeholder="핸드폰 번호"
            onChange={handleChange}
          />
          <StyledChangeButton>수정</StyledChangeButton>
        </StyledInputBox>
        <StyledInputBox>
          {' '}
          <label>성별</label>
          <StyledInfoInput value={formData.gender} disabled />
          <StyledChangeButton>완료</StyledChangeButton>
        </StyledInputBox>
      </StyledInfoForm>
    </StyledInfoBox>
  );
}

export default MyPageInfo;

const StyledInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 60rem;
  background: rgb(253, 253, 253);
  border-radius: 16px;
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
  width: 50rem;
  border: 1px solid #e5e5e5;

  & > label {
    display: inline-block;
    width: 10rem;
    height: 100%;
    align-self: center;
    justify-self: center;
    text-align: center;
    background-color: #f9f9f9;
    border-right: 1px solid #e5e5e5;
  }

  & > button {
    justify-self: stretch;
  }
`;

const StyledInfoInput = styled.input`
  width: 30rem;
  height: 4.5rem;
  outline: none;
  border: none;
`;

const StyledChangeButton = styled.button`
  width: 10rem;
  height: 5rem;
  background-color: #fff;
`;
