import React from 'react';
import FilteringOptions from '../../../../Components/Commons/FilteringOptions';
import FindPageBoard from '../../../../Components/TeamPage/FindPage/FindPageBoard';
import FindingMemberPageBoard from './FindingMemberPageBoard';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

type Applicant = {
  id: string;
  position: string;
  level: string;
  contents: string;
};

type DataProps = {
  group_id?: string;
  location: string;
  // leader_name?: string;
  author: string;
  body: string;
  gender: string;
  num: number; // 수정 필요함(어떻게 들어올 지 모름)
  position?: string;
  skill?: string;
  status: string;
  title: string;
  gk_count: number;
  gk_current_count: number;
  player_count: number;
  player_current_count: number;
  random_matched?: string;
  applicant?: Applicant[];
  [key: string]: string | number | undefined | Applicant[];
};

type FindingMemberProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // setModalData: React.Dispatch<React.SetStateAction<DataProps>>;
};
type FindMemberFilter = {
  status: string | null;
  location: string | null;
};

function FindingMember(props: FindingMemberProps) {
  const loc = useLocation();
  const {
    setShowModal,
    // setModalData
  } = props;
  const [status, setStatus] = React.useState('');
  const [location, setLocation] = React.useState('');

  const [findMemberFilter, setFindMemberFilter] =
    React.useState<FindMemberFilter>({
      status: null,
      location: null,
    });

  function handleReset() {
    setStatus('');
    setLocation('');
  }

  //새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<DataProps[]>([]); // <<<<<<<<<<< any 타입 정의를 해야되는데 좀 어려움

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/group`)
      .then((res) => {
        // 가져온 데이터가 있다면 data에 저장한다.
        const formattedData = res.data.data.map((item: any) => {
          return {
            ...item,
            author: item.leader_name,
          };
        });
        setData(formattedData);
      })
      .catch((error) => {
        // 가져온 데이터가 없다면 dummyData를 사용한다.
        setData([]);
      });
  }, []);

  // 필터링 조건을 갱신하는 부분
  React.useEffect(() => {
    const filter = {
      status: status === '모집상태' ? '' : status,
      location: location === '활동지역' ? '' : location,
    };
    setFindMemberFilter(filter);
  }, [status, location]);

  // 필터링 된 데이터를 관리하는 상태
  const [filteredData, setFilteredData] = React.useState(data);

  // 데이터를 필터링하는 부분, 상관없음일 경우 무조건 결과에 포함시킨다.
  React.useEffect(() => {
    const newData = data.filter((item) => {
      const filterList = Object.keys(findMemberFilter);
      for (let key of filterList) {
        if (findMemberFilter[key as keyof FindMemberFilter] === '상관없음') {
          return true;
        } else {
          if (
            typeof item[key] === 'string' &&
            typeof findMemberFilter[key as keyof FindMemberFilter] ===
              'string' &&
            (item[key] as string).includes(
              findMemberFilter[key as keyof FindMemberFilter] as string
            )
          ) {
            continue;
          } else if (
            typeof item[key] === 'number' &&
            typeof findMemberFilter[key as keyof FindMemberFilter] ===
              'number' &&
            item[key] === findMemberFilter[key as keyof FindMemberFilter]
          ) {
            continue;
          } else if (
            findMemberFilter[key as keyof FindMemberFilter] !== '' &&
            item[key] !== findMemberFilter[key as keyof FindMemberFilter]
          ) {
            return false;
          }
        }
      }
      return true;
    });
    setFilteredData(newData.reverse()); // 최신 게시글이 위로 가게 정렬함
  }, [data, findMemberFilter]);

  // 드롭다운 리스트를 정하는 부분
  const dropdownList = [
    {
      option: FilteringOptions.findingMember.status,
      state: status,
      setState: setStatus,
    },
    {
      option: FilteringOptions.findingMember.location,
      state: location,
      setState: setLocation,
    },
  ];

  // 표에 출력할 리스트를 정하는 부분
  const tableList = [
    { title: '작성자', body: 'author', style: { width: '10%' } },
    { title: '모집 포지션', body: 'gk_current_count', style: { width: '25%' } },
    { title: '모집 상태', body: 'status', style: { width: '10%' } },

    // { title: '지역', body: 'location', style: { width: '10%' } },
    // { title: '현재인원(GK)', body: 'gk_current_count', style: { width: '8%' } },
    // { title: '모집인원(GK)', body: 'gk_count', style: { width: '8%' } },
    // {
    //   title: '현재인원(Player)',
    //   body: 'player_current_count',
    //   style: { width: '8%' },
    // },
    // { title: '모집인원(Player)', body: 'player_count', style: { width: '8%' } },
  ];

  return (
    <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
      <StyledHeader>
        <h1>팀원 구해요</h1>
        <h3>함께 할 팀원을 구해보세요! 👋🏻</h3>
      </StyledHeader>
      <FindingMemberPageBoard
        dropdownList={dropdownList}
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
          <StyledWriteButton>글 작성하기</StyledWriteButton>
        </Link>
      </TeamPageFooter>
    </div>
  );
}

export default FindingMember;

// 팀페이지 헤더 (애니메이션 구현)
const TeamPageHeader = styled.div`
  font-size: 2rem;
  border: 1px solid #eee;
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

const StyledHeader = styled.div`
  h1 {
    font-size: 3rem;
    margin: 0;
  }
  h3 {
    font-size: 1.9rem;
    font-weight: 500;
    color: #9da7ae;
    margin: 1rem 0 2rem 0;
  }
`;

const TeamPageFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  margin-top: 3rem;
  margin-right: 4rem;
  float: right;
`;

const StyledWriteButton = styled.button`
  width: 13rem;
  height: 5rem;
  border-radius: 0.8rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.7rem;
  font-weight: 600;
`;
