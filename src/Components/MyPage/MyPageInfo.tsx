import react, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MyProfile from './MyPageProfile';

export type FormData = {
  user_id: string;
  name: string;
  nickname: string;
  email: string;
  phonenumber: string;
  gender?: string;
};

export function MyPageInfo() {
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    nickname: '',
    email: '',
    phonenumber: '',
    gender: '남',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get('http://localhost:8800/user/aaa', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data.userData)
      .then((user) => {
        setFormData((prev) => ({
          ...prev,
          user_id: user.user_id,
          name: user.name,
          nickname: user.nick_name,
          email: user.email,
          phonenumber: user.phone_number,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledInfoContainer>
      <MyProfile formData={formData} />
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
    </StyledInfoContainer>
  );
}

const StyledInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 50rem;
  background-color: rgb(247 247 247);
`;

const StyledInfoForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60rem;
`;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50rem;

  & > label {
    display: inline-block;
    width: 10rem;
    height: 4rem;
    align-self: center;
    justify-self: center;
    background-color: #fff;
    text-align: center;
    border-bottom: 1px solid black;
  }
`;

const StyledInfoInput = styled.input`
  width: 30rem;
  height: 4.5rem;
`;

const StyledChangeButton = styled.button`
  width: 6rem;
  height: 5rem;
  background-color: #fff;
`;
