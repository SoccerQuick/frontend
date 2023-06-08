import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CustomMapMarker from './CustomMapMarker';
import ResetMapBtn from './ResetMapBtn';
import FieldDummy from './fieldDummy';

const FieldMap: React.FC<{ searchKeyword: string }> = ({ searchKeyword }) => {
  const { naver } = window;
  const mapElement = useRef<HTMLElement | null | any>(null);
  var map: naver.maps.Map;
  const [AddressX, setAddressX] = useState<number>(0);
  const [AddressY, setAddressY] = useState<number>(0);
  const createMarkerList: naver.maps.Marker[] = [];

  //검색 키워드에 맞는 위경도 저장
  useEffect(() => {
    if (searchKeyword) {
      naver.maps.Service.geocode(
        { query: searchKeyword },
        function (status, res) {
          if (res.v2.addresses.length === 0) {
            if (!searchKeyword) {
              return alert('검색어를 입력해주세요.');
            } else {
              return alert('검색어를 다시 입력해주세요.');
            }
          } else {
            const resAddress = res.v2.addresses[0];
            const x = Number(resAddress.x);
            const y = Number(resAddress.y);
            setAddressX(x);
            setAddressY(y);
          }
        }
      );
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const center = new naver.maps.LatLng(AddressY, AddressX);
    const mapOptions: naver.maps.MapOptions = {
      center: center,
      zoom: 14,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      mapDataControl: false,
      scaleControl: false,
    };

    map = new naver.maps.Map(mapElement.current, mapOptions);

    addMarkers();
  }, [AddressX, AddressY]);

  const addMarkers = () => {
    // let mapBounds = mapElement.current.getBounds();
    for (let i = 0; i < FieldDummy.length; i++) {
      if (createMarkerList.length > 100) {
        break;
      }

      let markerObj = FieldDummy[i];
      //   let position = new naver.maps.LatLng(markerObj.lat, markerObj.lng);
      //   if (mapBounds.hasLatLng(position)) {
      const { id, title, lat, lng } = markerObj;
      addMarker(id, title, lat, lng);
      //   }
    }
  };

  const addMarker = (id: number, name: string, lat: number, lng: number) => {
    try {
      let newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lng, lat),
        map,
        title: name,
        clickable: true,
        icon: {
          content: CustomMapMarker({ title: name }),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
      });
      newMarker.setTitle(name);
      createMarkerList.push(newMarker);
    } catch (e) {}
  };

  useEffect(() => {
    const idleHandler = () => {
      clearMarkers();
      addMarkers();
    };

    const zoomChangeHandler = () => {
      if (mapElement.current.getZoom() <= 7) {
        clearMarkers();
      }
    };

    //컴포넌트 마운트 될 때 이벤트 등록
    naver.maps.Event.addListener(mapElement, 'idle', idleHandler);
    naver.maps.Event.addListener(mapElement, 'zoom_change', zoomChangeHandler);

    //클린업 함수로 언마운트 될 때 이벤트 해제
    return () => {
      naver.maps.Event.addListener(mapElement, 'idle', idleHandler);
      naver.maps.Event.addListener(
        mapElement,
        'zoom_change',
        zoomChangeHandler
      );
    };
  }, []);

  const clearMarkers = () => {
    createMarkerList.forEach((marker) => {
      marker.setMap(null);
    });
    createMarkerList.length = 0;
  };

  return (
    <StyledMapContainer>
      <StyledMap id="map" ref={mapElement}></StyledMap>;
      <ResetMapBtn />
    </StyledMapContainer>
  );
};

export default FieldMap;

const StyledMapContainer = styled.div`
  position: relative;
`;

const StyledMap = styled.div`
  width: 98.4rem;
  height: 47rem;
  margin: 0 auto;
`;
