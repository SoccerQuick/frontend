import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../styles/icon/search.svg';
import MypageIcon from '../styles/icon/mypage.svg';
import SoccerquickLogo from '../styles/icon/soccerquick-logo.png';
import MoreIcon from '../styles/icon/more.svg';

import './main.css';

const Main = () => {
  return (
    <>
    <div className="wrap">
      <div className="header">
        <div className="logo-main">
          <a className="logo-main-img">
            <img src={SoccerquickLogo} alt="싸커퀵" />
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
      </div>
      <div className="body"></div>
      <div className="footer">
        <div className='footer-content'>
          <p className='footer-title'>soccerquick.com</p>
          <p>싸커퀵에서 풋살을 한눈에</p>
          <p>이용 약관 | 개인정보 처리방침 | 사업자 정보 확인</p>
          <p>싸커퀵 | 서울특별시 감자구 고구마동</p>
          <p>대표 메일 contact@soccerquick.com | 마케팅 제안 marketing@soccerquick.com</p>
          <p>주식회사 고구마컴퍼니 | 사업자번호 123-456789-0 | 대표 고구마 </p>
          <p>Copyright SOCCERQUICK All rights reserved.</p>
        </div>
      </div>
      </>
  );
};

export default Main;
