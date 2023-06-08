import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CustomMapMarker from './CustomMapMarker';
import ResetMapBtn from './ResetMapBtn';
import FieldDummy from './fieldDummy';
import { listeners } from 'process';

const FieldMap: React.FC<{ searchKeyword: string }> = ({ searchKeyword }) => {
  const { naver } = window;
  const mapElement = useRef<HTMLElement | null | any>(null);
  let map: naver.maps.Map;
  const [AddressX, setAddressX] = useState<number>(0);
  const [AddressY, setAddressY] = useState<number>(0);
  const createMarkerList: naver.maps.Marker[] = [];

  //검색 키워드에 따라 해당 위치의 위경도 상태 저장!!
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

  //중심이 될 위경도 값 바탕으로 맵 생성하고 마커 생성 함수 호출 !!
  useEffect(() => {
    if (!mapElement.current || !naver) return;

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

  //구장 데이터 배열 순회하면서 마커 생성 진행!
  const addMarkers = () => {
    // let mapBounds = map.getBounds();
    for (let i = 0; i < FieldDummy.length; i++) {
      if (createMarkerList.length > 100) {
        break;
      }

      let markerObj = FieldDummy[i];
      // let position = new naver.maps.LatLng(markerObj.lat, markerObj.lng);
      // if (mapBounds.hasPoint(position)) {
      const { id, title, lat, lng } = markerObj;
      addMarker(id, title, lat, lng);
      // }
    }
  };

  //마커 생성 하고 createMarkerList에 추가!!
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
    const MoveEventListner = naver.maps.Event.addListener(
      map,
      'idle',
      idleHandler
    );
    return () => {
      naver.maps.Event.removeListener(MoveEventListner);
    };
  }, []);

  const idleHandler = () => {
    updateMarkers(map, createMarkerList);
  };

  const updateMarkers = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
    let mapBounds = map.getBounds();
    let marker: naver.maps.Marker, position;
    for (var i = 0; i < markers.length; i++) {
      marker = markers[i];
      position = marker.getPosition();
      if (mapBounds.hasPoint(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(marker);
      }
    }
  };

  const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    if (marker.getMap()) return;
    marker.setMap(map);
  };
  const hideMarker = (marker: naver.maps.Marker) => {
    if (!marker.getMap()) return;
    marker.setMap(null);
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
