import react, { useState } from 'react';
import { StyledInfoContainer, StyledInfoBox, StyledTitle } from './MyPageInfo';
import { StyledInputBox, StyledInfoInput, StyledButton } from './MyPageInput';
import styled from 'styled-components';
import axios from 'axios';

type MyPageCheckPasswordProps = {
  setCheckPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

function MyPageCheckPassword({ setCheckPassword }: MyPageCheckPasswordProps) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      user_id: 'aaa',
      password: password,
    };
    axios
      .post(`http://localhost:8800/auth/password`, data)
      .then((res) => res.request)
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          setCheckPassword(true);
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
      });
  };

  return (
    <StyledInfoContainer>
      <StyledInfoBox style={{ height: '25rem' }}>
        <StyledTitle style={{ marginTop: '3rem' }}>내 정보 확인</StyledTitle>
        <StyledInputBox style={{ marginBottom: '4rem' }}>
          <label>비밀번호 확인</label>
          <StyledInfoInput
            name="password"
            value={password}
            onChange={handleChange}
          />
          <StyledButton onClick={handlePasswordCheck}>확인</StyledButton>
        </StyledInputBox>
        <div style={{ color: 'red', marginBottom: '3rem' }}>{errorMsg}</div>
      </StyledInfoBox>
    </StyledInfoContainer>
  );
}

export default MyPageCheckPassword;
