import React from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import DetailPageBoard from '../../Posts/DetailPage';

type DataType = {
  group_id: string;
  num: number;
  title: string;
  author: string;
  location: string;
  status: string;
  gender: string;
  contents: string;
  gk_need: number;
  gk: number;
  player_need: number;
  player: number;
  allowRandom: string;
  [key: string]: string | number | undefined;
};

function DetailPage() {
  const location = useLocation();
  const data = location.state.data;
  const detailList = [
    { title: '활동지역', value: 'location' },
    { title: '현재인원(GK)', value: 'gk_current_count' },
    { title: '모집인원(GK)', value: 'gk_count' },
    { title: '현재인원(Player)', value: 'player_current_count' },
    { title: '모집인원(Player)', value: 'player_count' },
    { title: '성별', value: 'gender' },
  ];

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridAutoRows: 'min-content',
          height: '100rem',
        }}
      >
        <div>"Pages/TeamPage/Views/FindingMember/FindingMemberDetail.tsx"</div>
        <DetailPageBoard detailList={detailList} data={data} />
      </div>
    </>
  );
}

export default DetailPage;
