import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const FieldMap: React.FC<{ searchKeyword: string }> = ({ searchKeyword }) => {
  const { naver } = window;
  const mapElement = useRef(null);
  const [AddressX, setAddressX] = useState<number>(0);
  const [AddressY, setAddressY] = useState<number>(0);

  useEffect(() => {
    if (searchKeyword) {
      naver.maps.Service.geocode(
        { query: searchKeyword },
        function (status, res) {
          console.log(res);
          console.log(res.v2.addresses[0].x);
          const resAddress = res.v2.addresses[0];
          const x = Number(resAddress.x);
          const y = Number(resAddress.y);
          setAddressX(x);
          setAddressY(y);
        }
      );
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(AddressY, AddressX);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      mapDataControl: false,
      scaleControl: false,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [AddressX, AddressY]);

  return <StyledMap id="map" ref={mapElement}></StyledMap>;
};

export default FieldMap;

const StyledMap = styled.div`
  width: 98.4rem;
  height: 40rem;
  margin: 0 auto;
`;
