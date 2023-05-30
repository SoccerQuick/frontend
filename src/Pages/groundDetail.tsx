import React from 'react';
import styled from 'styled-components';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

import GroundDummy from '../Components/GroundDetail/dummyData_groundDetail';

const GroundDetail = () => {
  return (
    <>
      <Header />
      <div className="GroundDetailBody">
        <div className="slider"></div>
        <div className="GroundDetailHeader">
          <div className="groundDetailHeaderContent">
            <p className="header-location"></p>
            <h2 className="header-title"></h2>
            <div className="header-address">
              <p className="header-address-detail"></p>
              <p>주소복사</p>
              <p>지도보기</p>
            </div>
          </div>
          <div className="groundDetailHeaderBtn">
            <button>홈페이지 바로가기</button>
            <button>찜</button>
          </div>
        </div>
        <div className="source">이 구장 정보는 ㅇㅇ에서 제공됩니다.</div>

        <div className="groundChar">
          <div className="groundDetailBodyTop">
            <h2>🏷 시설 특징</h2>
            <p>
              변경 가능성이 있으므로 정확한 정보는 홈페이지에서 확인해주세요.
            </p>
          </div>
          <div className="ProvidedItems">
            <p>제공 항목</p>
            <ul>
              <li>무료주차</li>
              <li>샤워실</li>
              <li>풋살화 대여</li>
            </ul>
          </div>
          <div className="nonProvidedItems">
            <p>비제공 항목</p>
            <ul>
              <li>고양이</li>
              <li>강아지</li>
              <li>고슴도치</li>
            </ul>
          </div>
        </div>
        <div className="groundLocation">
          <div className="groundDetailBodyTop">
            <h2>🗺 위치</h2>
          </div>
          <div className="ground-map"></div>
          <div className="groundAddressDetail">
            <p>경기도 감자시 고구마구</p>
            <p className="copyAddress">주소 복사</p>
          </div>
        </div>
        <div className="reservationDetail">
          <div className="groundDetailBodyTop">
            <h2>🏷 시설 특징</h2>
            <p>
              변경 가능성이 있으므로 정확한 정보는 홈페이지에서 확인해주세요.
            </p>
          </div>
          <div className="reservationDetailContent">
            <div>
              <h3>일반</h3>
              <ul>
                <li>7일 전 취소 시 100% 환불</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GroundDetail;
