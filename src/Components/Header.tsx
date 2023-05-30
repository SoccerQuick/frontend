import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../styles/icon/search.svg';
import MypageIcon from '../styles/icon/mypage.svg';
import SoccerquickLogo from '../styles/icon/soccerquick-logo.png';
import MoreIcon from '../styles/icon/more.svg';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoMain>
        <a className="logo-main-img">
          <img src={SoccerquickLogo} alt="싸커퀵" />
        </a>
      </LogoMain>
      <HeaderMenu>
        <div className="header-search">
          <div className="header-search-bar">
            <img className="search-icon" src={SearchIcon} alt="" />
            <input
              type="search"
              placeholder="지역으로 풋살장 찾기"
              maxLength={100}
            />
          </div>
        </div>
        <div className="header-mypage">
          <img className="mypage-icon" src={MypageIcon} alt="" />
        </div>
        <div className="header-more">
          <img className="more-icon" src={MoreIcon} alt="" />
        </div>
      </HeaderMenu>
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
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.1rem;
  img {
    width: 2.5rem;
    height: 100%;
  }
  .header-search-bar {
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
  }
  .header-mypage {
    margin: 0.3rem 2rem 0 2rem;
  }
`;
