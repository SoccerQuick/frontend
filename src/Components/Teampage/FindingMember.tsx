import React from 'react';
import styled from 'styled-components';

type FindingMemberProps = {
  searchMode: string;
};

function FindingMember(props: FindingMemberProps) {
  const searchMode = props.searchMode;
  return (
    <>
      <Teampage>
        <TeamPageOption>
          <button>모집상태(드롭다운)</button>
          <button>지역(드롭다운)</button>
          <button>랜덤모집허용여부(드롭다운)</button>
          <button>현재인원(입력)</button>
          <button>성별(드롭다운)</button>
          <button>경기시간대(체크박스)</button>
        </TeamPageOption>
      </Teampage>
      <Teampage>
        <TeamPageBody>
          <table>
            <caption>팀원 구해요</caption>
            <thead>
              <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>모집현황(GK)</th>
                <th>모집현황(Player)</th>
                <th>랜덤모집허용</th>
                <th>상세조회</th>
                <th>신청하기</th>
              </tr>
            </thead>
            <tbody>
              {dummydata_findingMember.map((item) => (
                <tr key={item.num}>
                  <td>{item.num}</td>

                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.status}</td>
                  <td>{item.gk !== '' ? `모집완료(${item.gk})` : '모집 중'}</td>
                  <td>
                    {item.player_need === item.player.length
                      ? '모집완료'
                      : `${item.player.length} / ${item.player_need} `}
                  </td>
                  <td>{item.random === 1 ? '가능' : '불가능'}</td>
                  <td>
                    <button
                      onClick={() => {
                        alert(item.player);
                      }}
                    >
                      조회
                    </button>
                  </td>
                  <td>
                    <button>신청</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{' '}
        </TeamPageBody>
      </Teampage>
    </>
  );
}

export default FindingMember;

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

const dummydata_findingMember = [
  {
    num: 1,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    status: '모집중',
    gk: 'ㄱㅁㅇ',
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    random: 1,
    searchMode: '팀원 구해요',
  },
  {
    num: 2,
    title: '랏키퍼구합니다',
    author: 'ㄱㅁㅇ2',
    status: '모집중',
    gk: '',
    player_need: 4,
    player: ['고마오', '고마워', '고마옹', '고맙당'],
    random: 1,
    searchMode: '팀원 구해요',
  },
  {
    num: 3,
    title: '랏필드구합니다',
    author: 'ㄱㅁㅇ3',
    status: '모집중',
    gk: '귀엽네',
    player_need: 4,
    player: ['귀여움', '졸귀', '귀엽ㅎ'],
    random: 0,
    searchMode: '팀원 구해요',
  },
  {
    num: 4,
    title: '다구했어요ㅎㅎ',
    author: 'ㄱㅁㅇ4',
    status: '모집완료',
    gk: '올리버칸',
    player_need: 4,
    player: ['호날두', '메시', '음바페', '네이마르'],
    random: 1,
    searchMode: '팀원 구해요',
  },
  {
    num: 5,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    status: '모집중',
    gk: 'ㄱㅁㅇ',
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    random: 1,
    searchMode: '팀원 구해요',
  },
  {
    num: 6,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    status: '모집중',
    gk: 'ㄱㅁㅇ',
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    random: 1,
    searchMode: '팀원 구해요',
  },
  {
    num: 7,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    status: '모집중',
    gk: 'ㄱㅁㅇ',
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    random: 1,
    searchMode: '팀원 구해요',
  },
];
