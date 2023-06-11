import react, { useState, FormEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';
import { FormData } from '../../../Pages/MyPage';
import { MyPageInput } from './MyPageInput';
import { checkNewPassword } from '../checkPassword';
import { useNavigate } from 'react-router-dom';
import { AUTH_ACTIONS } from '../../../store/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';

type MyPageInfoProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  oldPassword: string;
};

export type ErrorMsg = {
  formMsg: string;
  passwordFormMsg: string;
};

export type PasswordForm = {
  newPassword: string;
  newPasswordConfirm: string;
};

export function MyPageInfo({
  formData,
  setFormData,
  oldPassword,
}: MyPageInfoProps) {
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    formMsg: '',
    passwordFormMsg: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!user) {
      alert('마이페이지는 로그인 후 사용해주세요.');
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newPassword, newPasswordConfirm } = passwordForm;
    if (newPassword.length > 0) {
      const check = await checkNewPassword(
        oldPassword,
        newPassword,
        newPasswordConfirm,
        setErrorMsg
      );
      if (!check) {
        return;
      }
    }

    // eslint-disable-next-line no-restricted-globals
    const result = confirm('정보를 수정 하시겠습니까?');
    if (result) {
      handleMyInfoChangeConfirm(newPassword, oldPassword);
    }
  };

  const handleMyInfoChangeConfirm = async (
    newPassword: String,
    oldPassword: String
  ) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          user_id: formData.user_id,
          name: formData.name,
          password: newPassword ? newPassword : oldPassword,
          nick_name: formData.nick_name,
          email: formData.email,
          phone_number: formData.phone_number,
          gender: formData.gender,
        },
        {
          withCredentials: true,
        }
      );
      alert(response.data.message);
      setErrorMsg({
        formMsg: '',
        passwordFormMsg: '',
      });
      setPasswordForm((prev) => ({
        ...prev,
        newPassword: '',
        newPasswordConfirm: '',
      }));
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        const responseData = axiosError.response?.data as { message?: string };
        setErrorMsg({
          formMsg: String(responseData.message),
          passwordFormMsg: '',
        });
      } else {
        setErrorMsg({
          formMsg: '오류가 발생했습니다.',
          passwordFormMsg: '',
        });
      }
    }
  };

  const handleWithDrawalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('정말 탈퇴 하시겠습니까?');
    if (result) {
      handleAlertWithDrawalConfirm(oldPassword);
    }
  };

  const handleAlertWithDrawalConfirm = (oldPassword: String) => {
    dispatch(AUTH_ACTIONS.logout());
    const headers = {
      withCredentials: true,
    };
    const data = { password: oldPassword, user_id: formData.user_id };

    axios
      .delete(`${process.env.REACT_APP_API_URL}/users`, {
        headers: headers,
        data: data,
      })
      .then(() => {
        alert('탈퇴 되었습니다.');
        navigate('/', { replace: true });
      })
      .catch((e) => console.log(e));
  };

  return (
    <StyledInfoContainer>
      {' '}
      <StyledInfoBox>
        {' '}
        <StyledTitle>내 정보</StyledTitle>
        <StyledInfoForm onSubmit={handleSubmit}>
          <MyPageInput
            title="아이디"
            name="user_id"
            value={formData.user_id}
            noButton
          />
          <MyPageInput
            title="이름"
            name="name"
            value={formData.name}
            noButton
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
            noButton
          />
          <div>
            {' '}
            <StyledSubmitButton>변경</StyledSubmitButton>
            <StyledRedSubmitButton onClick={handleWithDrawalClick}>
              회원 탈퇴
            </StyledRedSubmitButton>
          </div>
        </StyledInfoForm>
        <StyledErrorDiv>{errorMsg.formMsg}</StyledErrorDiv>
      </StyledInfoBox>
      <StyledInfoBox>
        {' '}
        <StyledTitle>비밀번호 변경</StyledTitle>
        <StyledShortInfoForm onSubmit={handleSubmit}>
          <MyPageInput
            title="새 비밀번호"
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            setPasswordForm={setPasswordForm}
          />
          <MyPageInput
            title="새 비밀번호 확인"
            name="newPasswordConfirm"
            type="password"
            value={passwordForm.newPasswordConfirm}
            setPasswordForm={setPasswordForm}
          />
          <StyledSubmitButton>변경</StyledSubmitButton>
        </StyledShortInfoForm>
        <StyledErrorDiv>{errorMsg.passwordFormMsg}</StyledErrorDiv>
      </StyledInfoBox>
    </StyledInfoContainer>
  );
}

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > div:last-child {
    height: 43rem;
    margin-bottom: 2.5rem;
  }
`;

export const StyledInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60rem;
  background: rgb(253, 253, 253);
  border-radius: 16px;
  margin-top: 2.5rem;
`;

export const StyledTitle = styled.div`
  align-self: flex-start;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 2rem 0 2rem 5rem;
  width: 50rem;
  border-bottom: 3px solid #e5e5e5;
`;

const StyledInfoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  height: 70%;

  & > div:last-child {
    align-self: end;
  }
`;

const StyledSubmitButton = styled.button`
  align-self: end;
  width: 8rem;
  margin: 1rem 1rem 0 0;
  font-size: 1rem;
  background-color: #09cf00;
  color: #fff;
  border-radius: 0.5rem;
`;

const StyledRedSubmitButton = styled(StyledSubmitButton)`
  background-color: #ec5d5e;
`;

const StyledErrorDiv = styled.div`
  color: red;
  margin: 0.5rem 0;
`;

const StyledShortInfoForm = styled(StyledInfoForm)`
  height: 14rem;
`;
