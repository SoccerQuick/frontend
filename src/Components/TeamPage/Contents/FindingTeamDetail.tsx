import React from 'react';
import styled from 'styled-components';

function FindingTeamDetail(props: any) {
  const modalData = props.modalData;
  return (
    <>
      <div>포지션 : {modalData.position}</div>
      <div>실력 : {modalData.position}</div>
      <div>성별 : {modalData.gender}</div>
      <div>{modalData.body}</div>
    </>
  );
}

// {
//     num: 3,
//     title: '나 이민우. 우승팀 들어간다. 불러라.',
//     author: '이민우',
//     area: '부산',
//     status: '미완료',
//     position: '필드플레이어',
//     skill: '프로',
//     gender: '남',
//   },

export default FindingTeamDetail;

const StyledHeader = styled.div`
  z-index: 901;
  display: flex;
  margin-top: auto;
  background-color: black;
`;
