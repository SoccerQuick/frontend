import React from 'react';
import styled from 'styled-components';

type FindingTeamProps = {
  searchMode: string;
};

function FindingTeam(props: FindingTeamProps) {
  const searchMode = props.searchMode;
  return (
    <>
      <Teampage>
        <TeamPageOption>
          <button>모집상태(드롭다운)</button>
          <button>지역(드롭다운)</button>
          <button>실력(드롭다운)</button>
          <button>포지션(드롭다운)</button>
          <button>성별(드롭다운)</button>
          <button>경기시간대(체크박스)</button>
        </TeamPageOption>
      </Teampage>
      <Teampage>
        <TeamPageBody>
          <table>
            <caption>팀 구해요</caption>
            <thead>
              <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Author</th>
                <th>status</th>
                <th>Position</th>
                <th>technic</th>
                <th>gender</th>
                <th>상세조회</th>
                <th>초대하기</th>
              </tr>
            </thead>
            <tbody>
              {dummydata_findingTeam.map((item) => (
                <tr key={item.num}>
                  <td>{item.num}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.status === 1 ? '완료' : '미완료'}</td>
                  <td>{item.position}</td>
                  <td>{item.technic}</td>
                  <td>{item.gender}</td>
                  <td>
                    <button>조회</button>
                  </td>
                  <td>
                    <button>초대</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TeamPageBody>
      </Teampage>
    </>
  );
}

export default FindingTeam;

const Teampage = styled.div`
  display: flex;
  justify-content: center;
`;

const TeamPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: beige;
  width: 70%;
  table {
    width: 100%;
  }

  tr {
    // display: flex;
    justify-content: space-between;
    align-items: center;
  }
  td {
    // display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
const TeamPageOption = styled.div`
  display: flex;
  margin: 10px 10px;
`;

const dummydata_findingTeam = [
  {
    num: 1,
    title: '중수 필더 팀 구합니다',
    author: '그리즈만',
    status: 0,
    position: 'player',
    technic: 'expert',
    gender: '남',
  },
  {
    num: 2,
    title: '거의그냥 거미손 팀구함ㅎ',
    author: '마누엘 노이어',
    status: 0,
    position: 'goalkeeper',
    technic: 'legendary',
    gender: '남',
  },
];
