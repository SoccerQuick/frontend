import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import FilteringOptions from '../../../Commons/FilteringOptions';
import DropDown from '../../../Commons/DropDown';
import axios from 'axios';

type modalDataProps = {
  area: string;
  author: string;
  body: string;
  gender: string;
  num: number; // 수정 필요함(어떻게 들어올 지 모름)
  position?: string;
  skill?: string;
  status: string;
  title: string;
  gk_need?: number;
  gk?: number;
  player_need?: number;
  player?: number;
  allowRandom?: string;
};

type FindingTeamProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<React.SetStateAction<modalDataProps[]>>;
};
type FindTeamFilter = {
  status: string | null;
  area: string | null;
  skill: string | null;
  position: string | null;
  gender: string | null;
};

function FindingTeam(props: FindingTeamProps) {
  const location = useLocation();
  const [status, setStatus] = React.useState('');
  const [area, setArea] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [gender, setGender] = React.useState('');

  const { setShowModal, setModalData } = props;

  const [findTeamFilter, setFindTeamFilter] = React.useState<FindTeamFilter>({
    status: null,
    area: null,
    skill: null,
    position: null,
    gender: null,
  });

  //새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<any[]>([]); // <<<<<<<<<<< any 타입 정의를 해야되는데 좀 어려움

  React.useEffect(() => {
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
  }, []);

  // 필터링 조건을 갱신하는 부분
  React.useEffect(() => {
    const filter = {
      status: status === '모집상태' ? '' : status,
      area: area === '활동지역' ? '' : area,
      skill: skill === '실력수준' ? '' : skill,
      position: position === '포지션' ? '' : position,
      gender: gender === '성별' ? '' : gender,
    };
    setFindTeamFilter(filter);
  }, [status, area, skill, position, gender]);

  // 정렬 조건이 변할 때 페이지에 보여줄 데이터를 필터링 하는 부분
  const [filteredData, setFilteredData] = React.useState(dummydata_findingTeam);

  // 데이터를 필터링하는 부분, 상관없음일 경우 무조건 결과에 포함시킨다.
  React.useEffect(() => {
    const newData = data.filter((item) => {
      const filterList = Object.keys(findTeamFilter);
      for (let key of filterList) {
        if (findTeamFilter[key as keyof FindTeamFilter] === '상관없음') {
          return true;
        } else {
          if (
            findTeamFilter[key as keyof FindTeamFilter] !== '' &&
            findTeamFilter[key as keyof FindTeamFilter] !== item[key]
          ) {
            return false;
          }
        }
      }
      return true;
    });
    setFilteredData(newData);
  }, [data, findTeamFilter]);

  return (
    <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
      <Teampage>
        <TeamPageOption>
          <DropDown
            list={FilteringOptions.findingTeam.status}
            selected={status}
            setSelected={setStatus}
            style={{ width: '16rem' }}
          />
          <DropDown
            list={FilteringOptions.findingTeam.area}
            selected={area}
            setSelected={setArea}
            style={{ width: '16rem' }}
          />
          <DropDown
            list={FilteringOptions.findingTeam.skill}
            selected={skill}
            setSelected={setSkill}
            style={{ width: '16rem' }}
          />
          <DropDown
            list={FilteringOptions.findingTeam.position}
            selected={position}
            setSelected={setPosition}
            style={{ width: '16rem' }}
          />
          <DropDown
            list={FilteringOptions.findingTeam.gender}
            selected={gender}
            setSelected={setGender}
            style={{ width: '16rem' }}
          />
          <button
            onClick={() => {
              setStatus('');
              setArea('');
              setSkill('');
              setPosition('');
              setGender('');
            }}
          >
            초기화
          </button>
        </TeamPageOption>
        <Link
          to="/teampage/submit"
          style={{
            display: location.pathname === '/teampage/submit' ? 'none' : 'flex',
            marginLeft: 'auto',
            height: 'fit-content',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 7,
          }}
        >
          <button>글 작성하기</button>
        </Link>
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
                  <td>
                    {item.status === '미완료' ? (
                      <button>초대</button>
                    ) : (
                      item.status
                    )}
                  </td>
                </StyledTr>
              ))}
            </tbody>
          </table>
        </TeamPageBody>
      </Teampage>
    </div>
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
  width: 100%;
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
