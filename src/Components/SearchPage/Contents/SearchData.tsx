import React, { useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import SearchFilter from './SearchFilter';
import axios from 'axios';
import FilterlingOptions from '../FilterlingOptions';

type FindingGroundProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: any[];
  setModalData: React.Dispatch<React.SetStateAction<any[]>>;
};

type FindMemberFilter = {
  provided: string | null;
  area: string | null;
  nonProvided: string | null;
};

function FindingGround(props: FindingGroundProps) {
  const setShowModal = props.setShowModal;
  const setModalData = props.setModalData;

  // Left Bar에서 설정한 필터링 옵션이 담기는 상태. get 요청 보낼 때 전달해주어야 함.
  const [filterOption, setFilterOption] = React.useState<string[]>([]);

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
    setData(dummydata_filteredGround);
    // });
  };

  // 정렬 조건이 변할 때 페이지에 보여줄 데이터를 필터링 하는 부분
  const [filteredData, setFilteredData] = React.useState(
    dummydata_filteredGround
  );

  return (
    <div style={{ width: '100%' }}>
      <SearchFilter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      <Searchpage>
        <SearchPageBody>
          <table>
            {/* <caption>경기장 목록</caption> */}
            <thead>
              <tr
                style={{
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #DDDDDD',
                }}
              >
                <th>순번</th>
                <th>지역</th>
                <th>경기장</th>
                <th>상세조회</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <>
                  <StyledTr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.address.shortAddress}</td>
                    <td>
                      <div>{item.title}</div>
                      <StyledTableCell>
                        {item.provided.map((data, index) => (
                          <StyledTable key={index} data={data}>
                            {data}
                          </StyledTable>
                        ))}
                      </StyledTableCell>
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setModalData(data[idx]);
                        }}
                      >
                        조회
                      </button>
                    </td>
                  </StyledTr>
                </>
              ))}
            </tbody>
          </table>
        </SearchPageBody>
      </Searchpage>
    </div>
  );
}

export default FindingGround;

const Searchpage = styled.div`
  display: flex;
  //   justify-content: center;
  font-size: 1.7rem;
`;

const SearchPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 3rem;
  //   background-color: beige;
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

const StyledTableCell = styled.div`
  display: inline-block;
  height: 2.7rem;
  padding: 0.3rem 0.8rem;
  margin: 1rem 1rem;
  //   background: #fafafa;
  border-radius: 0.4rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: #888888;
  line-height: 2rem;
`;

const StyledTable = styled.div<{ data: string }>`
  display: inline;
  height: 4rem;
  padding: 0.3rem 1rem;
  margin-right: 1.2rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ data }) => getColorBydata(data)};
  background-color: #f3f1ff;
`;

const StyledTr = styled.tr`
  height: 10rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
`;

const getColorBydata = (data: string) => {
  if (data === '풋살화 대여') {
    return '#7a6fce';
  } else if (data === '남녀 구분 화장실') {
    return '#98212b';
  } else if (data === '공 대여') {
    return '#009e5c';
  } else if (data === '조끼 대여') {
    return 'green';
  } else if (data === '무료 주차') {
    return 'skyblue';
  } else if (data === '샤워실') {
    return 'blue';
  }
};

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

const dummydata_filteredGround = [
  {
    title: '고양 싸커스토리 축구클럽 운정점',
    image: [
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
    ],
    address: {
      shortAddress: '경기 / 고양시',
      fullAddress: '경기도 고양시 일산서구 덕이로 310-2',
    },
    provided: ['풋살화 대여', '남녀 구분 화장실', '공 대여', '조끼 대여'],
    nonProvided: ['무료 주차', '샤워실'],
    reservation: {
      일반: [
        '7일 전 취소 시 100% 환불',
        '5일 전 취소 시 80% 환불',
        '3일 전 취소 시 50% 환불',
        '2일 전 ~ 예약 당일 환불 불가',
        '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
      ],
      천재지변: [
        '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
        '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
      ],
      '우천시 변경 기준': [
        '시간 당 5mm 이상 시 날짜 변경 가능',
        '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
        '단순 변심에 의한 날짜 변경은 불가',
      ],
    },
    url: 'https://www.plabfootball.com/stadium/3415/info/',
    source: '(주)플랩',
  },
  {
    title: 'ㄱㅁㅇ클럽',
    image: [
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
    ],
    address: {
      shortAddress: '경기 / 수원시',
      fullAddress: '경기도 수원시 장안구 만석로29 712동 1604호',
    },
    provided: ['풋살화 대여', '남녀 구분 화장실', '공 대여', '조끼 대여'],
    nonProvided: ['무료 주차', '샤워실'],
    reservation: {
      일반: [
        '7일 전 취소 시 100% 환불',
        '5일 전 취소 시 80% 환불',
        '3일 전 취소 시 50% 환불',
        '2일 전 ~ 예약 당일 환불 불가',
        '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
      ],
      천재지변: [
        '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
        '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
      ],
      '우천시 변경 기준': [
        '시간 당 5mm 이상 시 날짜 변경 가능',
        '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
        '단순 변심에 의한 날짜 변경은 불가',
      ],
    },
    url: 'https://www.plabfootball.com/stadium/3415/info/',
    source: '(주)플랩',
  },
  {
    title: 'ㄱㅁㅇ클럽',
    image: [
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
    ],
    address: {
      shortAddress: '경기 / 수원시',
      fullAddress: '경기도 수원시 장안구 만석로29 712동 1604호',
    },
    provided: ['풋살화 대여', '공 대여'],
    nonProvided: ['무료 주차', '샤워실', '조끼 대여', '남녀 구분 화장실'],
    reservation: {
      일반: [
        '7일 전 취소 시 100% 환불',
        '5일 전 취소 시 80% 환불',
        '3일 전 취소 시 50% 환불',
        '2일 전 ~ 예약 당일 환불 불가',
        '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
      ],
      천재지변: [
        '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
        '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
      ],
      '우천시 변경 기준': [
        '시간 당 5mm 이상 시 날짜 변경 가능',
        '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
        '단순 변심에 의한 날짜 변경은 불가',
      ],
    },
    url: 'https://www.plabfootball.com/stadium/3415/info/',
    source: '(주)플랩',
  },
  {
    title: 'ㄱㅁㅇ클럽',
    image: [
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
    ],
    address: {
      shortAddress: '경기 / 수원시',
      fullAddress: '경기도 수원시 장안구 만석로29 712동 1604호',
    },
    provided: [
      '풋살화 대여',
      '공 대여',
      '무료 주차',
      '샤워실',
      '조끼 대여',
      '남녀 구분 화장실',
    ],
    nonProvided: [],
    reservation: {
      일반: [
        '7일 전 취소 시 100% 환불',
        '5일 전 취소 시 80% 환불',
        '3일 전 취소 시 50% 환불',
        '2일 전 ~ 예약 당일 환불 불가',
        '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
      ],
      천재지변: [
        '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
        '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
      ],
      '우천시 변경 기준': [
        '시간 당 5mm 이상 시 날짜 변경 가능',
        '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
        '단순 변심에 의한 날짜 변경은 불가',
      ],
    },
    url: 'https://www.plabfootball.com/stadium/3415/info/',
    source: '(주)플랩',
  },
];
