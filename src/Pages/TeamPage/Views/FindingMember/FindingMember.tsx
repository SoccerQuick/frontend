import React from 'react';
import FilteringOptions from '../../../../Components/Commons/FilteringOptions';
import FindingMemberPageBoard from './FindingMemberPageBoard';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../../../../store/selectors/authSelectors';
import styled from 'styled-components';
import axios from 'axios';

interface Applicant {
  id: string;
  position: string;
  level: string;
  contents: string;
}

interface DataProps {
  group_id?: string;
  location: string;
  author: string;
  body: string;
  gender: string;
  num: number;
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
}

interface FindingMemberProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FindMemberFilter {
  status: string | null;
  location: string | null;
}

function FindingMember(props: FindingMemberProps) {
  const isLogin = useSelector(isLogInSelector);

  const loc = useLocation();
  const { setShowModal } = props;
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
  const [data, setData] = React.useState<DataProps[]>([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/groups`)
      .then((res) => {
        const formattedData = res.data.data.map((item: DataProps) => {
          return {
            ...item,
            author: item.leader_name,
          };
        });
        setData(formattedData);
      })
      .catch((error) => {
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

  return (
    <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
      <StyledHeader>
        <h1>팀원 모집・신청</h1>
        <h3>싸커퀵에서 함께할 팀을 만들어보세요! 👋🏻</h3>
      </StyledHeader>
      <FindingMemberPageBoard
        dropdownList={dropdownList}
        handleReset={handleReset}
        setShowModal={setShowModal}
        filteredData={filteredData}
      />
      <TeamPageFooter>
        {isLogin && (
          <Link
            to="/teampage/submit"
            style={{
              display: loc.pathname === '/teampage/submit' ? 'none' : 'flex',
            }}
          >
            <StyledWriteButton>글 작성하기</StyledWriteButton>
          </Link>
        )}
      </TeamPageFooter>
    </div>
  );
}

export default FindingMember;

const StyledHeader = styled.div`
  padding-left: 1rem;
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
