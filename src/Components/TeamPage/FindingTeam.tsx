import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import FilterlingOptions from './FilterlingOptions';

type FindingTeamProps = {
  searchMode: string;
};
interface FindTeamSort {
  status: string | null;
  area: string | null;
  skill: string | null;
  position: string | null;
  gender: string | null;
  // playtime: string | null;
}

function FindingTeam(props: FindingTeamProps) {
  const searchMode = props.searchMode;
  const [findTeamSort, setFindTeamSort] = React.useState<FindTeamSort>({
    status: null,
    area: null,
    skill: null,
    position: null,
    gender: null,
    // playtime: null,
  });
  const [filteredData, setFilteredData] = React.useState(dummydata_findingTeam);

  return (
    <>
      <Teampage>
        <TeamPageOption>
          <SelectCategory
            options={FilterlingOptions.findingTeam.status}
            defaultValue={FilterlingOptions.findingTeam.status[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindTeamSort((init: any) => ({
                ...init,
                status:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilterlingOptions.findingTeam.area}
            defaultValue={FilterlingOptions.findingTeam.area[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindTeamSort((init: any) => ({
                ...init,
                area:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilterlingOptions.findingTeam.skill}
            defaultValue={FilterlingOptions.findingTeam.skill[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindTeamSort((init: any) => ({
                ...init,
                skill:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilterlingOptions.findingTeam.position}
            defaultValue={FilterlingOptions.findingTeam.position[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindTeamSort((init: any) => ({
                ...init,
                position:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilterlingOptions.findingTeam.gender}
            defaultValue={FilterlingOptions.findingTeam.gender[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindTeamSort((init: any) => ({
                ...init,
                gender:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
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
                <th>Area</th>
                <th>status</th>
                <th>Position</th>
                <th>skill</th>
                <th>gender</th>
                <th>상세조회</th>
                <th>초대하기</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.num}>
                  <td>{item.num}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.area}</td>
                  <td>{item.status === 1 ? '완료' : '미완료'}</td>
                  <td>{item.position}</td>
                  <td>{item.skill}</td>
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
      <div style={{ fontSize: 25 }}>
        모집상태 : {findTeamSort.status}
        ...활동지역 : {findTeamSort.area}
        ... 실력수준 : {findTeamSort.skill}
        ...포지션 : {findTeamSort.position}
        ... 성별 : {findTeamSort.gender}
      </div>
    </>
  );
}

export default FindingTeam;

const Teampage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2.2rem;
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

// Select 라이브러리를 사용하여 만든 드롭다운 박스의 스타일 지정
const SelectCategory = styled(Select)`
  width: 16rem;
  font-size: 2rem;
`;
// Select 라이브러리에서 사용할 세부 스타일 속성
const SelectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '4px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#38D411' : 'white',
    color: state.isSelected ? 'white' : 'black',
    ':hover': {
      backgroundColor: state.isSelected ? '#38D411' : '#96DF84',
    },
  }),
};

const dummydata_findingTeam = [
  {
    num: 1,
    title: '중수 필더 팀 구합니다',
    author: '그리즈만',
    area: '영국',
    status: 0,
    position: 'player',
    skill: 'expert',
    gender: '남',
  },
  {
    num: 2,
    title: '거의그냥 거미손 팀구함ㅎ',
    author: '마누엘 노이어',
    area: '독일',
    status: 0,
    position: 'goalkeeper',
    skill: 'legendary',
    gender: '남',
  },
  {
    num: 3,
    title: '나 이민우. 우승팀 들어간다. 불러라.',
    author: '이민우',
    area: '부산',
    status: 0,
    position: 'player',
    skill: '우주최강수준',
    gender: '남',
  },
  {
    num: 4,
    title: '축구고수 권성경 팀구함',
    author: '권성경',
    area: '경기',
    status: 0,
    position: 'player',
    skill: '민우보다잘함',
    gender: '여',
  },
];
