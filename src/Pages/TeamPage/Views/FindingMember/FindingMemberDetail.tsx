import React from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import DetailPageBoard from '../../Posts/FindingMemberDetailPage';
import axios from 'axios';

function DetailPage() {
  const detailList = [
    { title: '활동지역', value: 'location' },
    { title: '현재인원(GK)', value: 'gk_current_count' },
    { title: '모집인원(GK)', value: 'gk_count' },
    { title: '현재인원(Player)', value: 'player_current_count' },
    { title: '모집인원(Player)', value: 'player_count' },
  ];

  return (
    <>
      <div>
        <DetailPageBoard detailList={detailList} />
      </div>
    </>
  );
}

export default DetailPage;
