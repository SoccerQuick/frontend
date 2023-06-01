import React from 'react';
import styled from 'styled-components';

function FindingMemberDetail(props: any) {
  const modalData = props.modalData;
  return (
    <>
      <div>
        모집인원 : 골키퍼 {modalData.gk_need}명 / 필드플레이어{' '}
        {modalData.player_need}명
      </div>
      <div>
        현재인원
        <div>골키퍼 : {modalData.gk}</div>
        <div>필드플레이어 : {modalData.player}</div>
      </div>
      <div>랜덤매칭 허용여부 : {modalData.allowRandom}</div>
      <div>{modalData.body}</div>
    </>
  );
}

export default FindingMemberDetail;
