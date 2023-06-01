import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import FilterlingOptions from '../FilterlingOptions';
import axios from 'axios';

type FindingTeamProps = {
  searchMode: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: any[];
  setModalData: React.Dispatch<React.SetStateAction<any[]>>;
};
type FindTeamFilter = {
  status: string | null;
  area: string | null;
  skill: string | null;
  position: string | null;
  gender: string | null;
  // playtime: string | null;
};

function FindingTeam(props: FindingTeamProps) {
  const searchMode = props.searchMode;
  const setShowModal = props.setShowModal;
  const modalData = props.modalData;
  const setModalData = props.setModalData;
  const [findTeamFilter, setFindTeamFilter] = React.useState<FindTeamFilter>({
    status: null,
    area: null,
    skill: null,
    position: null,
    gender: null,
    // playtime: null,
  });

  //새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // axios
    //   .get('gomao.com')
    //   .then((res) => {
    //     // 가져온 데이터가 있다면 data에 저장한다.
    //     setData(res.data);
    //   })
    //   .catch((error) => {
    //     // 가져온 데이터가 없다면 dummyData를 사용한다.
    setData(dummydata_findingTeam);
    // });
  };

  // 정렬 조건이 변할 때 페이지에 보여줄 데이터를 필터링 하는 부분
  const [filteredData, setFilteredData] = React.useState(dummydata_findingTeam);
  React.useEffect(() => {
    const newData = data.filter((item) => {
      const filterList = Object.keys(findTeamFilter);
      for (let key of filterList) {
        if (
          findTeamFilter[key as keyof FindTeamFilter] !== null &&
          findTeamFilter[key as keyof FindTeamFilter] !== item[key]
        ) {
          return false;
        }
      }
      return true;
    });

    setFilteredData(newData);
  }, [data, findTeamFilter]);

  return (
    <>
      <Teampage>
        <TeamPageOption>
          <SelectCategory
            options={FilterlingOptions.findingTeam.status}
            defaultValue={FilterlingOptions.findingTeam.status[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindTeamFilter((init: any) => ({
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
              setFindTeamFilter((init: any) => ({
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
              setFindTeamFilter((init: any) => ({
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
              setFindTeamFilter((init: any) => ({
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
              setFindTeamFilter((init: any) => ({
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
              setFindTeamFilter({
                status: null,
                area: null,
                skill: null,
                position: null,
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
            <caption style={{ paddingBottom: '1.5rem' }}>팀 구해요</caption>
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
                <th>포지션</th>
                <th>실력</th>
                <th>성별</th>
                <th>상세조회</th>
                <th>초대하기</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <StyledTr key={item.num}>
                  <td style={{ width: '5%' }}>{item.num}</td>
                  <td style={{ width: '30%' }}>{item.title}</td>
                  <td style={{ width: '10%' }}>{item.author}</td>
                  <td style={{ width: '5%' }}>{item.area}</td>

                  <td style={{ width: '15%' }}>{item.position}</td>
                  <td style={{ width: '10%' }}>{item.skill}</td>
                  <td style={{ width: '5%' }}>{item.gender}</td>
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
                  {item.status === '미완료' ? (
                    <td>
                      <button>초대</button>
                    </td>
                  ) : (
                    <td>{item.status}</td>
                  )}
                </StyledTr>
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
  font-size: 1.7rem;
`;

const TeamPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  // background-color: beige;
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

const dummydata_findingTeam = [
  {
    num: 1,
    title: '중수 필더 팀 구합니다',
    author: '그리즈만',
    area: '영국',
    status: '미완료',
    position: '필드플레이어',
    skill: '프로',
    gender: '남',
    body: '나 모르냐고?',
  },
  {
    num: 2,
    title: '거의그냥 거미손 팀구함ㅎ',
    author: '마누엘 노이어',
    area: '독일',
    status: '완료',
    position: '골키퍼',
    skill: '프로',
    gender: '남',
    body: '나 모르냐고?',
  },
  {
    num: 3,
    title: '나 이민우. 우승팀 들어간다. 불러라.',
    author: '이민우',
    area: '부산',
    status: '미완료',
    position: '필드플레이어',
    skill: '프로',
    gender: '남',
    body: "아이엠 Minu Lee? Isn't this enough?",
  },
  {
    num: 4,
    title: '축구고수 권성경 팀구함',
    author: '권성경',
    area: '경기',
    status: '미완료',
    position: '상관없음',
    skill: '민우보다잘함',
    gender: '여',
    body: '적어도 민우보단 잘하니까 팀초대좀요',
  },
];
