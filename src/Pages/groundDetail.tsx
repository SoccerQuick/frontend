import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import GroundDummy from '../Components/GroundDetail/dummyData_groundDetail';
import './groundDetail.css';
import OneMarkerMap from '../Components/GroundDetail/OneMarkerMap';

interface groundDataType {
  title: string;
  image: string[];
  address: {
    shortAddress: string;
    fullAddress: string;
  };
  provided: string[];
  nonProvided: string[];
  reservation: {
    [key: string]: string[];
  };
  url: string;
  source: string;
}

const GroundDetail = () => {
  const [groundData, setGroundData] = useState<groundDataType>();
  const [reservationData, setReservationData] = useState<string[]>([]);

  useEffect(() => {
    setGroundData(GroundDummy);
  }, []);

  useEffect(() => {
    if (groundData) {
      setReservationData(Object.keys(groundData.reservation));
    }
  }, [groundData]);

  return (
    <>
      <Header />
      <div className="GroundDetail">
        <div className="slider">
          <img src={groundData && groundData.image[0]} alt="" />
        </div>
        <div className="GroundDetailHeader">
          <div className="groundDetailHeaderContent">
            <p className="headerLocation">
              {groundData && groundData.address.shortAddress}
            </p>
            <h2 className="headerTitle">{groundData && groundData.title}</h2>
            <div className="headerAddress">
              <div className="headerAddress-detail">
                {groundData && groundData.address.fullAddress}
              </div>
              <p className="copy">주소복사</p>
              <p>지도보기</p>
            </div>
          </div>
          <div className="groundDetailHeaderBtn">
            <button>
              <a href={groundData && groundData.url}>홈페이지 바로가기</a>
            </button>
            <button>찜</button>
          </div>
        </div>
        <div className="source">
          이 구장 정보는 <span>{groundData && groundData.source}</span>에서
          제공됩니다.
        </div>

        <div className="groundChar contentsBox">
          <div className="contentsTitle">
            <h2>🏷 시설 특징</h2>
            <p>
              변경 가능성이 있으므로 정확한 정보는 홈페이지에서 확인해주세요.
            </p>
          </div>
          <div className="providedItems">
            <p className="smallTtitle">제공 항목</p>
            <ul>
              {groundData &&
                groundData.provided.map((data) => <li key={data}>{data}</li>)}
            </ul>
          </div>
          <div className="non providedItems">
            <p className="smallTtitle">비제공 항목</p>
            <ul>
              {groundData &&
                groundData.nonProvided.map((data) => (
                  <li key={data}>{data}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="groundLocation contentsBox">
          <div className="contentsTitle">
            <h2>🗺 위치</h2>
          </div>
          <div className="ground-map">
            {groundData && (
              <OneMarkerMap address={groundData.address.fullAddress} />
            )}
          </div>
          <div className="groundAddressDetail">
            <p>{groundData && groundData.address.fullAddress}</p>
            <p className="copyAddress">주소 복사</p>
          </div>
        </div>
        <div className="reservationDetail contentsBox">
          <div className="contentsTitle">
            <h2>📝 예약 취소 및 환불 규정</h2>
            <p>
              변경 가능성이 있으므로 정확한 정보는 홈페이지에서 확인해주세요.
            </p>
          </div>
          <div className="reservationDetailContent">
            <div>
              {reservationData &&
                reservationData.map((data) => (
                  <>
                    <h3 key={data}>{data}</h3>
                    {groundData &&
                      groundData.reservation[data].map((liData) => (
                        <li key={liData}>{liData}</li>
                      ))}
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GroundDetail;
