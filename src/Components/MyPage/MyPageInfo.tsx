import react, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

type FormData = {
  user_id: string;
  password: string;
  name: string;
  nickname: string;
  email: string;
  phonenumber: string;
  gender?: string;
};

function MyPageInfo() {
  const [formData, setFormData] = useState<FormData>({
    user_id: '',
    password: '',
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

  // useEffect(() => {

  //   fetch(`http://localhost:8800/user/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setFormData((prev) => ({ ...prev, result }));
  //       console.log(formData);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <StyledInfoContainer>
      <StyledInfoForm>
        <label>아이디</label>
        <StyledInfoInput
          value={formData.user_id}
          placeholder="아이디"
          onChange={handleChange}
        />
        <label>비밀번호</label>
        <StyledInfoInput
          value={formData.password}
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <label>이름</label>
        <StyledInfoInput
          value={formData.name}
          placeholder="이름"
          onChange={handleChange}
        />
        <label>닉네임</label>
        <StyledInfoInput
          value={formData.nickname}
          placeholder="닉네임"
          onChange={handleChange}
        />
        <label>이메일</label>
        <StyledInfoInput
          value={formData.email}
          placeholder="이메일"
          onChange={handleChange}
        />
        <label>핸드폰 번호</label>
        <StyledInfoInput
          value={formData.phonenumber}
          placeholder="핸드폰 번호"
          onChange={handleChange}
        />
        <label>성별</label>
        <StyledInfoInput value={formData.gender} disabled />
      </StyledInfoForm>
    </StyledInfoContainer>
  );
}

export default MyPageInfo;

const StyledInfoContainer = styled.div`
  width: 100%;
  height: 50rem;
  background-color: #e3e5e8;
`;

const StyledInfoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInfoInput = styled.input`
  width: 30rem;
  height: 4.5rem;
`;
