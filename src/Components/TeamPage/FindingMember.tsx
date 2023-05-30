import React, { useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import FilteringOptions from './FilterlingOptions';
import axios from 'axios';

type FindingMemberProps = {
  searchMode: string;
};

type FindMemberFilter = {
  status: string | null;
  area: string | null;
  allowRandom: string | null;
  members: number | null;
  gender: string | null;
};

function FindingMember(props: FindingMemberProps) {
  const searchMode = props.searchMode;
  const [findMemberFilter, setFindMemberFilter] =
    React.useState<FindMemberFilter>({
      status: null,
      area: null,
      allowRandom: null,
      members: null,
      gender: null,
    });

  //새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('gomao.com')
      .then((res) => {
        // 가져온 데이터가 있다면 data에 저장한다.
        setData(res.data);
      })
      .catch((error) => {
        // 가져온 데이터가 없다면 dummyData를 사용한다.
        setData(dummydata_findingMember);
      });
  };

  // 정렬 조건이 변할 때 페이지에 보여줄 데이터를 필터링 하는 부분
  const [filteredData, setFilteredData] = React.useState(
    dummydata_findingMember
  );
  React.useEffect(() => {
    const newData = data.filter((item) => {
      const filterList = Object.keys(findMemberFilter);
      for (let key of filterList) {
        if (
          findMemberFilter[key as keyof FindMemberFilter] !== null &&
          findMemberFilter[key as keyof FindMemberFilter] !== item[key]
        ) {
          return false;
        }
      }
      return true;
    });

    setFilteredData(newData);
  }, [data, findMemberFilter]);

  return (
    <>
      <Teampage>
        <TeamPageOption>
          <SelectCategory
            options={FilteringOptions.findingMember.status}
            defaultValue={FilteringOptions.findingMember.status[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindMemberFilter((init: any) => ({
                ...init,
                status:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilteringOptions.findingMember.area}
            defaultValue={FilteringOptions.findingMember.area[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindMemberFilter((init: any) => ({
                ...init,
                area:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilteringOptions.findingMember.allowRandom}
            defaultValue={FilteringOptions.findingMember.allowRandom[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindMemberFilter((init: any) => ({
                ...init,
                allowRandom:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilteringOptions.findingMember.members}
            defaultValue={FilteringOptions.findingMember.members[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindMemberFilter((init: any) => ({
                ...init,
                members:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilteringOptions.findingMember.gender}
            defaultValue={FilteringOptions.findingMember.gender[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindMemberFilter((init: any) => ({
                ...init,
                gender:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <button>경기시간대(체크박스)</button>
          <button
            onClick={() => {
              setFindMemberFilter({
                status: null,
                area: null,
                allowRandom: null,
                members: null,
                gender: null,
              });
            }}
          >
            초기화
          </button>
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
              {filteredData.map((item) => (
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
          </table>
        </TeamPageBody>
      </Teampage>
    </>
  );
}

export default FindingMember;

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
    body: '하하하하하하하하하하하하하하하하 하하하하하하하하하하하하하하하하하하하하하하',
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
    body: 'ㄱㅁㅇ',
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
    body: 'ㄱㅁㅇ',
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
    body: 'ㄱㅁㅇ',
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
    body: 'ㄱㅁㅇ',
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
    body: 'ㄱㅁㅇ',
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
    body: 'ㄱㅁㅇ',
  },
];
