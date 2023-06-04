import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FilteringOptions from '../../../Commons/FilteringOptions';
import axios from 'axios';
import DropDown from '../../../Commons/DropDown';

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
  gender: string | null;
};

function FindingMember(props: FindingMemberProps) {
  const [status, setStatus] = React.useState('');
  const [area, setArea] = React.useState('');
  const [allowRandom, setAllowRandom] = React.useState('');
  const [gender, setGender] = React.useState('');

  const setShowModal = props.setShowModal;
  const setModalData = props.setModalData;
  const [findMemberFilter, setFindMemberFilter] =
    React.useState<FindMemberFilter>({
      status: null,
      area: null,
      allowRandom: null,
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

  // 필터링 조건을 갱신하는 부분
  React.useEffect(() => {
    const filter = {
      status: status === '모집상태' ? '' : status,
      area: area === '활동지역' ? '' : area,
      allowRandom: allowRandom === '랜덤매칭' ? '' : allowRandom,
      gender: gender === '성별' ? '' : gender,
    };
    setFindMemberFilter(filter);
  }, [status, area, allowRandom, gender]);

  // 필터링 된 데이터를 관리하는 상태
  const [filteredData, setFilteredData] = React.useState(
    dummydata_findingMember
  );

  // 데이터를 필터링하는 부분, 상관없음일 경우 무조건 결과에 포함시킨다.
  React.useEffect(() => {
    const newData = data.filter((item) => {
      const filterList = Object.keys(findMemberFilter);
      for (let key of filterList) {
        if (findMemberFilter[key as keyof FindMemberFilter] === '상관없음') {
          return true;
        } else {
          if (
            findMemberFilter[key as keyof FindMemberFilter] !== '' &&
            findMemberFilter[key as keyof FindMemberFilter] !== item[key]
          ) {
            return false;
          }
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
          <DropDown
            list={FilteringOptions.findingMember.status}
            selected={status}
            setSelected={setStatus}
            style={{ width: '16rem' }}
          />
          <DropDown
            list={FilteringOptions.findingMember.area}
            selected={area}
            setSelected={setArea}
            style={{ width: '16rem' }}
          />
          <DropDown
            list={FilteringOptions.findingMember.allowRandom}
            selected={allowRandom}
            setSelected={setAllowRandom}
            style={{ width: '16rem' }}
          />
          <DropDown
            list={FilteringOptions.findingMember.gender}
            selected={gender}
            setSelected={setGender}
            style={{ width: '16rem' }}
          />
          <button
            onClick={() => {
              setStatus('');
              setArea('');
              setAllowRandom('');
              setGender('');
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
                    {item.status === '미완료' ? (
                      <button>신청</button>
                    ) : (
                      <span
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {item.status}
                      </span>
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
  width: 100%;
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
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: ['ㄱㅁㅇ'],
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    allowRandom: '허용',
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
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: [],
    player_need: 4,
    player: ['고마오', '고마워', '고마옹', '고맙당'],
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 3,
    title: '랏필드구합니다',
    author: 'ㄱㅁㅇ3',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: ['귀엽네'],
    player_need: 4,
    player: ['귀여움', '졸귀', '귀엽ㅎ'],
    allowRandom: '비허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 4,
    title: '다구했어요ㅎㅎ',
    author: 'ㄱㅁㅇ4',
    area: '서울',
    status: '완료',
    gender: '상관없음',
    gk_need: 1,
    gk: ['올리버칸'],
    player_need: 4,
    player: ['호날두', '메시', '음바페', '네이마르'],
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 5,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: ['ㄱㅁㅇ'],
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 6,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: ['ㄱㅁㅇ'],
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 7,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '미완료',
    gender: '상관없음',
    gk_need: 1,
    gk: ['ㄱㅁㅇ'],
    player_need: 4,
    player: ['gogumao', 'cutehane', 'gomao'],
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
];