import React from 'react';
import FilteringOptions from '../../../../Components/Commons/FilteringOptions';
import FindPageBoard from './FindingTeamPageBoard';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

type Applicant = {
  id: string;
  position: string;
  level: string;
  contents: string;
};

type modalDataProps = {
  group_id: string;
  location: string;
  leader_name: string;
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
  applicant?: Applicant[];
  [key: string]: string | number | undefined | Applicant[];
};

type FindingTeamProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // setModalData: React.Dispatch<React.SetStateAction<modalDataProps>>;
};
type FindTeamFilter = {
  status: string;
  location: string;
  skill: string;
  position: string;
  gender: string;
};

function FindingTeam(props: FindingTeamProps) {
  const loc = useLocation();
  const {
    setShowModal,
    // setModalData
  } = props;
  const [status, setStatus] = React.useState('');
  const [location, setlocation] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [findTeamFilter, setFindTeamFilter] = React.useState<FindTeamFilter>({
    status: '',
    location: '',
    skill: '',
    position: '',
    gender: '',
  });

  function handleReset() {
    setStatus('');
    setlocation('');
    setSkill('');
    setPosition('');
    setGender('');
  }

  //새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<any[]>([]); // <<<<<<<<<<< any 타입 정의를 해야되는데 좀 어려움

  React.useEffect(() => {
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/groups`)
    //   .then((res) => {
    //     // 가져온 데이터가 있다면 data에 저장한다.
    //     console.log('데이터 받아옴 ㅎㅎ');
    //     setData(res.data.data);
    //   })
    //   .catch((error) => {
    //     // 가져온 데이터가 없다면 dummyData를 사용한다.
    setData(dummydata_findingTeam);
    //   console.log(`${process.env.REACT_APP_API_URL}`);
    // });
  }, []);

  // 필터링 조건을 갱신하는 부분
  React.useEffect(() => {
    const filter = {
      status: status === '모집상태' ? '' : status,
      location: location === '활동지역' ? '' : location,
      skill: skill === '실력수준' ? '' : skill,
      position: position === '포지션' ? '' : position,
      gender: gender === '성별' ? '' : gender,
    };
    setFindTeamFilter(filter);
  }, [status, location, skill, position, gender]);

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
            typeof item[key] === 'string' &&
            typeof findTeamFilter[key as keyof FindTeamFilter] === 'string' &&
            (item[key] as string).includes(
              findTeamFilter[key as keyof FindTeamFilter] as string
            )
          ) {
            continue;
          } else if (
            typeof item[key] === 'number' &&
            typeof findTeamFilter[key as keyof FindTeamFilter] === 'number' &&
            item[key] === findTeamFilter[key as keyof FindTeamFilter]
          ) {
            continue;
          } else if (
            findTeamFilter[key as keyof FindTeamFilter] !== '' &&
            item[key] !== findTeamFilter[key as keyof FindTeamFilter]
          ) {
            return false;
          }
        }
      }
      return true;
    });
    setFilteredData(newData.reverse()); // 최신 게시글이 상단으로 올라가도록 정렬
  }, [data, findTeamFilter]);

  // 드롭다운 리스트를 정하는 부분
  const dropdownList = [
    {
      option: FilteringOptions.findingTeam.status,
      state: status,
      setState: setStatus,
    },
    {
      option: FilteringOptions.findingTeam.location,
      state: location,
      setState: setlocation,
    },
    {
      option: FilteringOptions.findingTeam.skill,
      state: skill,
      setState: setSkill,
    },
    {
      option: FilteringOptions.findingTeam.position,
      state: position,
      setState: setPosition,
    },
  ];

  // 표에 출력할 리스트를 정하는 부분
  const tableList = [
    { title: '작성자', body: 'leader_name', style: { width: '10%' } },
    { title: '지역', body: 'location', style: { width: '5%' } },
    { title: '포지션', body: 'position', style: { width: '15%' } },
    { title: '실력', body: 'skill', style: { width: '10%' } },
    { title: '성별', body: 'gender', style: { width: '5%' } },
  ];

  return (
    <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
      <TeamPageHeader>
        <StyledBanner>
          개인 홍보 게시판입니다. 자신을 어필하고 팀 제안을 받아보세요!
        </StyledBanner>
      </TeamPageHeader>
      <FindPageBoard
        dropdownList={dropdownList}
        tableList={tableList}
        handleReset={handleReset}
        setShowModal={setShowModal}
        // setModalData={setModalData}
        filteredData={filteredData}
        // data={data}
      />
      <TeamPageFooter>
        <Link
          to="/teampage/submit"
          style={{
            display: loc.pathname === '/teampage/submit' ? 'none' : 'flex',
          }}
        >
          <button>글 작성하기</button>
        </Link>
      </TeamPageFooter>
    </div>
  );
}

export default FindingTeam;

const dummydata_findingTeam = [
  {
    group_id: '123',
    num: 1,
    title: '중수 필더 팀 구합니다',
    leader_name: '그리즈만',
    location: '영국',
    status: '미완료',
    position: '필드플레이어',
    skill: '프로',
    gender: '남',
    body: '나 모르냐고?',
  },
  {
    num: 2,
    title: '거의그냥 거미손 팀구함ㅎ',
    leader_name: '마누엘 노이어',
    location: '독일',
    status: '완료',
    position: '골키퍼',
    skill: '프로',
    gender: '남',
    body: '나 모르냐고?',
  },
  {
    num: 3,
    title: '나 이민우. 우승팀 들어간다. 불러라.',
    leader_name: '이민우',
    location: '부산',
    status: '미완료',
    position: '필드플레이어',
    skill: '프로',
    gender: '남',
    body: "아이엠 Minu Lee? Isn't this enough?<br />성경이 덤벼라 ㅇㅇ",
  },
  {
    num: 4,
    title: '축구고수 권성경 팀구함',
    leader_name: '권성경',
    location: '경기',
    status: '미완료',
    position: '상관없음',
    skill: '프로',
    gender: '여',
    body: '적어도 민우보단 잘하니까 팀초대좀요',
  },
];

// 팀페이지 헤더 (애니메이션 구현)
const TeamPageHeader = styled.div`
  font-size: 2rem;
  border: 1px solid;
  overflow: hidden;
`;

const StyledBanner = styled.span`
  display: inline-block;
  animation: slide-left 8s linear infinite;
  @keyframes slide-left {
    0% {
      transform: translateX(200%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const TeamPageFooter = styled.div`
  display: flex;
  background-color: skyblue;
  justify-content: flex-end;
  width: fit-content;
  margin-top: 3rem;
  margin-right: 3rem;
  float: right;
`;
