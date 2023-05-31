import React, { useEffect, useState, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const OneMarkerMap = () => {
  const NAVER_CLIENT_ID = 'f5ud0dpuss';
  const NAVER_CLIENT_SECRET = 'wm9rttVl92KKEHOWk5rYPZMck0NDjCMSsK4GjPNK';
  const NAVER_GEOCODE_URL =
    'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=';
  const mapElement = useRef(null);

  const address = '관양동 826';
  const encodedAddress = encodeURIComponent(address);

  const headers = {
    'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
    'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
  };

  useEffect(() => {
    axios
      .get(NAVER_GEOCODE_URL + encodedAddress, { headers })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return <div ref={mapElement} style={{ minHeight: '400px' }} />;
};

export default OneMarkerMap;
