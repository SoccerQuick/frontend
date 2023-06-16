import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AUTH_ACTIONS } from '../../ReduxStore/modules/Auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../ReduxStore/modules/Auth/authSelectors';
import axios from 'axios';

export function MyPageMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const handleLoginOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('로그아웃 하시겠습니까?');
    if (result) {
      handleAlertConfirm();
    }
  };
  const handleAlertConfirm = async () => {
    dispatch(AUTH_ACTIONS.logout());

    // logout
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/auths/logout`, {
        withCredentials: true,
      })
      .then(() => {
        navigate(window.location.pathname);
      })
      .catch((e) => console.log(e));
  };
  return (
    <StyledMenu>
      <StyledMenuProfile>
        <StyledImgWrapper>
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <AdminButton
              onClick={() => {
                navigate('/admin');
              }}
            >
              A
            </AdminButton>
          )}
          <StyledProfileImg type="image" src={user?.profile} alt="profile" />
        </StyledImgWrapper>
        <StyledProfileInfo
          title={user ? user.nickname : '미로그인'}
          onClick={() => {
            navigate('/mypage');
          }}
        >
          {user ? `${user.nickname}님` : '미로그인'}
        </StyledProfileInfo>
      </StyledMenuProfile>
      <div>|</div>
      <StyledMenuItem onClick={handleLoginOutClick}>로그아웃</StyledMenuItem>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  display: flex;
  width: 23rem;
  padding: 0.5rem 0;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 2rem;

  & > div:nth-child(2) {
    align-self: center;
    color: #e5e5e5;
    font-weight: bold;
  }
`;

const StyledMenuProfile = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProfileImg = styled.input`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: white;
  border: 1px solid #e5e5e5;
`;

const StyledProfileInfo = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  font-size: 1.4rem;
  margin-bottom: 0.2rem;
  width: 6.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledMenuItem = styled.div`
  flex: 2;
  /* display: flex; */
  text-align: center;
  /* align-items: center; */
  /* justify-content: center; */
  cursor: pointer;
  padding-top: 0.4rem;
  color: rgb(62, 84, 99);
  font-size: 1.4rem;
  &:first-child {
    margin-top: 15px;
  }
`;

const AdminButton = styled.button`
  background-color: transparent;
  margin-left: 1rem;
  border-radius: 3rem;
  border: 1px solid;
  text-align: center;
`;
