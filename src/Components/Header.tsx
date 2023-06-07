import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../styles/icon/search.svg';
import MypageIcon from '../styles/icon/mypage.svg';
import SoccerquickLogo from '../styles/icon/soccerquick-logo.png';
import MoreIcon from '../styles/icon/more.svg';
import AuthModal from './AuthModal/AuthModal';
import { MyPageMenu } from './Commons/MyPageMenu';
import { useSelector } from 'react-redux';
import { isLogInSelector } from './AuthModal/AuthRedux/selectors/authSelectors';

const Header = () => {
  const [authModal, setAuthModal] = useState<boolean>(false);
  const [myPageMenu, setMyPageMenu] = useState<boolean>(true);
  const navigate = useNavigate();
  const isLogin = useSelector(isLogInSelector);
  const handleLoginModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAuthModal((prev) => !prev);
    setMyPageMenu((prev) => !prev);
  };
  const handleMyPageMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMyPageMenu((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <LogoMain>
        <div onClick={() => navigate('/')}>
          <img src={SoccerquickLogo} alt="SoccerQuick" />
        </div>
      </LogoMain>
      <HeaderMenu>
        <div>
          <HeaderSearchBar>
            <img src={SearchIcon} alt="search" />
            <input
              type="search"
              placeholder="지역으로 풋살장 찾기"
              maxLength={100}
            />
          </HeaderSearchBar>
        </div>
        <HeaderMyPage>
          {isLogin ? (
            <HeaderMyPageButton onClick={handleMyPageMenu}>
              <img src={MypageIcon} alt="my" />
              {myPageMenu && <MyPageMenu handleMyPageMenu={handleMyPageMenu} />}
            </HeaderMyPageButton>
          ) : (
            <HeaderLoginButton onClick={handleLoginModal}>
              <img src={MypageIcon} alt="my" />
              <div>로그인</div>
            </HeaderLoginButton>
          )}
        </HeaderMyPage>

        <div>
          <img src={MoreIcon} alt="more" />
        </div>
      </HeaderMenu>
      {authModal && <AuthModal setAuthModal={setAuthModal} />}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 98.4rem;
  padding: 0 2rem;
  height: 6rem;
  margin: 1.4rem auto;

  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const LogoMain = styled.div`
  img {
    width: 13rem;
    height: 6rem;
    vertical-align: middle;
    cursor: pointer;
  }
`;

const HeaderMenu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 1.1rem;
  img {
    width: 2.5rem;
    height: 100%;
  }
`;

const HeaderSearchBar = styled.div`
  width: 35rem;
  height: 4rem;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0.8rem;
  display: inline-block;
  border-radius: 0.6rem;
  input {
    color: #3e5463;
    font-size: 1.4rem;
    border: none;
    background: none;
    width: 85%;
    padding: 0 0 0 1rem;
    line-height: 2.5rem;
  }
`;

const HeaderMyPage = styled.div``;

const HeaderLoginButton = styled.div`
  display: flex;
  position: relative;
  width: 8rem;
  padding: 0.5rem;
  margin: 0.3rem 2rem 0 2rem;
  border-radius: 2.5rem;
  border: 1px solid #e5e5e5;
  & > div {
    margin-top: 0.1rem;
  }
`;

const HeaderMyPageButton = styled.div`
  display: flex;
  position: relative;
  padding: 0.5rem;
  margin: 0.3rem 2rem 0 2rem;
  border-radius: 2.5rem;
  border: 1px solid #e5e5e5;
`;
