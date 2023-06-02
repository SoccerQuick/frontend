import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import FilteringOptions from '../FilteringOptions';
import axios from 'axios';

type FindingMemberProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: any[];
  setModalData: React.Dispatch<React.SetStateAction<any[]>>;
};

type FindMemberFilter = {
  status: string | null;
  area: string | null;
  allowRandom: string | null;
  members: number | null;
  gender: string | null;
};

function FindingMember(props: FindingMemberProps) {
  const setShowModal = props.setShowModal;
  const setModalData = props.setModalData;
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

  // API 연결 대비 초안 작성, 현재는 dummy data를 가져오고 있음.
  const fetchData = () => {
    // axios
    //   .get('gomao.com')
    //   .then((res) => {
    //     // 가져온 데이터가 있다면 data에 저장한다.
    //     setData(res.data);
    //   })
    //   .catch((error) => {
    //     // 가져온 데이터가 없다면 dummyData를 사용한다.
    setData(dummydata_findingMember);
    // });
  };

  // 필터링 된 데이터를 관리하는 상태
  const [filteredData, setFilteredData] = React.useState(
    dummydata_findingMember
  );

  // 정렬 조건이나 데이터가 변하면 자료를 필터링하는 부분
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
            <caption style={{ paddingBottom: '1.5rem' }}>팀원 구해요</caption>
            <thead>
              <tr
                style={{
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #DDDDDD',
                }}
              >
                <th>순번</th>
                <th>제목</th>
                <th>작성자</th>
                <th>지역</th>
                <th>모집현황(GK)</th>
                <th>모집현황(Player)</th>
                <th>상세조회</th>
                <th>신청하기</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <StyledTr key={item.num}>
                  <td style={{ width: '5%' }}>{idx + 1}</td>
                  <td style={{ width: '30%' }}>
                    <Link to={`/teampage/detail/${item.num}`}>
                      {item.title}
                    </Link>
                  </td>
                  <td style={{ width: '10%' }}>{item.author}</td>
                  <td style={{ width: '5%' }}>{item.area}</td>
                  <td style={{ width: '15%' }}>
                    {item.gk_need === item.gk.length
                      ? '모집완료'
                      : `${item.gk.length} / ${item.gk_need} `}
                  </td>
                  <td style={{ width: '15%' }}>
                    {item.player_need === item.player.length
                      ? '모집완료'
                      : `${item.player.length} / ${item.player_need} `}
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setModalData(data[item.num - 1]);
                      }}
                    >
                      조회
                    </button>
                  </td>
                  <td>
                    {item.status === '모집중' ? (
                      <button>신청</button>
                    ) : (
                      <td
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {item.status}
                      </td>
                    )}
                  </td>
                </StyledTr>
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
  font-size: 1.7rem;
`;

const TeamPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  table {
    width: 100%;
  }

  tr {
    justify-content: space-between;
    align-items: center;
  }
  td {
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
  width: 14rem;
  font-size: 1.4rem;
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

const StyledTr = styled.tr`
  height: 4rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
`;

// 더미 데이터
const dummydata_findingMember = [
  {
    num: 1,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '모집중',
    gk_need: 1,
    gk: ['ㄱㅁㅇ'],
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    allowRandom: '가능',
    body: '하하하하하하하하하하하하하하하하 하하하하하하하하하하하하하하하하하하하하하하',
    applicant: [
      {
        nickName: '고고마오',
        position: 'gk',
        skill: '세미프로',
        body: '저 자신있습니다',
      },
      {
        nickName: '고구마',
        position: 'player',
        skill: '세미프로',
        body: '캐리해드림ㅎㅎ',
      },
    ],
  },
  {
    num: 2,
    title: '랏키퍼구합니다',
    author: 'ㄱㅁㅇ2',
    area: '서울',
    status: '모집중',
    gk_need: 1,
    gk: [],
    player_need: 4,
    player: ['고마오', '고마워', '고마옹', '고맙당'],
    allowRandom: '가능',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 3,
    title: '랏필드구합니다',
    author: 'ㄱㅁㅇ3',
    area: '서울',
    status: '모집중',
    gk_need: 1,
    gk: ['귀엽네'],
    player_need: 4,
    player: ['귀여움', '졸귀', '귀엽ㅎ'],
    allowRandom: '불가능',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 4,
    title: '다구했어요ㅎㅎ',
    author: 'ㄱㅁㅇ4',
    area: '서울',
    status: '모집완료',
    gk_need: 1,
    gk: ['올리버칸'],
    player_need: 4,
    player: ['호날두', '메시', '음바페', '네이마르'],
    allowRandom: '가능',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 5,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '모집중',
    gk_need: 1,
    gk: ['ㄱㅁㅇ'],
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    allowRandom: '가능',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 6,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '모집중',
    gk_need: 1,
    gk: ['ㄱㅁㅇ'],
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    allowRandom: '가능',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 7,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '모집중',
    gk_need: 1,
    gk: ['ㄱㅁㅇ'],
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    allowRandom: '가능',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
];
