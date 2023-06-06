import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DetailPageBoard from '../../../Components/TeamPage/Contents/DetailPage/DetailPageBoard';

// 현재 미사용 페이지임.
function DetailPage() {
  const { id } = useParams();
  const detailList = [
    { title: '활동지역', value: 'area' },
    { title: '포지션', value: 'position' },
    { title: '실력수준', value: 'skill' },
    { title: '성별', value: 'gender' },
  ];
  type DataType = {
    num: number;
    title: string;
    author: string;
    area: string;
    status: string;
    position: string;
    skill: string;
    gender: string;
    body: string;
    [key: string]: string | number | undefined;
  };

  const dummydata: DataType = {
    num: 3,
    title: '나 이민우. 우승팀 들어간다. 불러라.',
    author: '이민우',
    area: '부산',
    status: '미완료',
    position: '필드플레이어',
    skill: '프로',
    gender: '남',
    body: "아이엠 Minu Lee? Isn't this enough?",
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridAutoRows: 'min-content',
          height: '100rem',
        }}
      >
        등록번호 {id} 팀 모집 페이지 내용 ㄱㅁㅇ
        <DetailPageBoard detailList={detailList} data={dummydata} />
      </div>
    </>
  );
}

export default DetailPage;

const Teampage = styled.div`
  display: flex;
  justify-content: center;
`;
const TeamPageHeader = styled.div`
  display: flex;
  width: 70%;
  background-color: yellowgreen;
`;
const TeamPageOption = styled.div`
  display: flex;
  margin: 10px 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const ModalPage = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50rem;
  height: 50rem;
  background-color: rgba(255, 255, 255);
  z-index: 999;
`;
