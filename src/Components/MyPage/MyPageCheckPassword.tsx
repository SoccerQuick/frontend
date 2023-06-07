import react, { useState } from 'react';
import { StyledInfoContainer, StyledInfoBox, StyledTitle } from './MyPageInfo';
import { StyledInputBox, StyledInfoInput, StyledButton } from './MyPageInput';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/authSelectors';

type MyPageCheckPasswordProps = {
  setCheckPassword: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

function MyPageCheckPassword({
  setCheckPassword,
  password,
  setPassword,
}: MyPageCheckPasswordProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const user = useSelector(userSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      user_id: user?.user_id,
      password: password,
    };
    const header = {
      withCredentials: true,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/password`, data, header)
      .then((res) => res.request)
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          setCheckPassword(true);
        }
      })
      .catch((err) => {
        if (user) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg('로그인을 먼저 진행해주세요.');
        }
      });
  };

  return (
    <StyledInfoContainer>
      <StyledInfoBox style={{ height: '22rem' }}>
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
