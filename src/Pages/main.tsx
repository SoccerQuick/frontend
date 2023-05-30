import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../styles/icon/search.svg';
import MypageIcon from '../styles/icon/mypage.svg';
import MoreIcon from '../styles/icon/more.svg';

const Main = () => {
  return (
    <div className="wrap">
      <div className="header">
        <div className="logo-main">
          <a className="logo-main-img">
            <img src="" alt="싸커퀵" />
          </a>
        </div>
        <div className="header-menu">
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
        </div>
      </div>
      <div className="body"></div>
      <div className="footer"></div>
    </div>
  );
};

export default Main;
