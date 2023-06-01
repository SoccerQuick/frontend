import React, { useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
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
  const [findMemberFilter, setFindMemberFilter] =
    React.useState<FindMemberFilter>({
      provided: null,
      area: null,
      nonProvided: null,
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
    setData(dummydata_filteredGround);
    // });
  };

  // 정렬 조건이 변할 때 페이지에 보여줄 데이터를 필터링 하는 부분
  const [filteredData, setFilteredData] = React.useState(
    dummydata_filteredGround
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
      <Searchpage>
        <SearchPageOption>
          <SelectCategory
            options={FilterlingOptions.findingGround.provided}
            defaultValue={FilterlingOptions.findingGround.provided[0]}
            styles={SelectStyles}
            onChange={(selectedOption: any) => {
              setFindMemberFilter((init: any) => ({
                ...init,
                provided:
                  selectedOption.value === 'option0'
                    ? null
                    : selectedOption.label,
              }));
            }}
          />
          <SelectCategory
            options={FilterlingOptions.findingGround.area}
            defaultValue={FilterlingOptions.findingGround.area[0]}
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

          <button
            onClick={() => {
              setFindMemberFilter({
                provided: null,
                area: null,
                nonProvided: null,
              });
            }}
          >
            초기화
          </button>
        </SearchPageOption>
      </Searchpage>
      <Searchpage>
        <SearchPageBody>
          <table>
            <caption>팀원 구해요</caption>
            <thead>
              <tr>
                <th>Number</th>
                <th>Area</th>
                <th>Title</th>
                <th>Provided</th>
                <th>상세조회</th>
                <th>신청하기</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.address.shortAddress}</td>
                  <td>{item.title}</td>
                  <td>{item.provided}</td>
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
                  <td>
                    <button>신청</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SearchPageBody>
      </Searchpage>
    </>
  );
}

export default FindingGround;

const Searchpage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2.2rem;
`;

const SearchPageBody = styled.div`
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
const SearchPageOption = styled.div`
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
];
