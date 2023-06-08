import react, { useState } from 'react';
import styled from 'styled-components';

function MyPostTable() {
  const [reviewList, setReviewList] = useState(REVIEW_LIST_DUMMY_DATA);
  const filteredItems = reviewList.filter((item) => item.author === '김승섭');
  return (
    <TableContainer>
      <table>
        <thead>
          <StyledTitleTr key={title}>
            {' '}
            {properties.map((property) => (
              <th>{property}</th>
            ))}
            <th></th>
          </StyledTitleTr>
        </thead>
        <tbody>
          {filteredItems.map((item, idx) => {
            return (
              <StyledItemTr key={`review-${idx}`}>
                <td>{idx + 1}</td>
                <td>{item.reviewTitle}</td>
                <td>{item.author}</td>
                <td>{item.createdDate}</td>
                <td>{item.like}</td>
                <td>
                  <button>조회</button>
                </td>
              </StyledItemTr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
}

export default MyPostTable;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & > table {
    width: 80%;
  }
`;

const StyledTitleTr = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5rem;
  background-color: #fafafa;
  padding: 0 3rem;
  font-size: 1.5rem;

  & > th {
    flex: 2;
  }

  & > th:nth-child(2) {
    flex: 4;
    text-align: start;
  }

  & > th:first-child {
    flex: 1;
    text-align: start;
  }
`;

const StyledItemTr = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 8rem;
  border-bottom: 1px solid rgb(238, 238, 238);
  padding: 0 3rem;

  & > td {
    flex: 2;
    text-align: center;
  }

  & > td:nth-child(2) {
    flex: 4;
    text-align: start;
  }

  & > td:first-child {
    flex: 1;
    text-align: start;
  }
`;

const title = '이름';
const properties = ['no', '리뷰제목', '작성자', '작성일자', '좋아요'];
const REVIEW_LIST_DUMMY_DATA = [
  {
    userIcon: '최도원',
    reviewTitle: '이번 매치 OOO 매니저님 너무 친절하셨어요! 또 뵙고 싶네요~',
    author: '최도원',
    area: '수원',
    createdDate: '2023-06-08',
    stadium: '수원 HM파크',
    like: 7,
  },
  {
    userIcon: '안동현',
    reviewTitle: '오우 쉣! 여기 너무 별로야!',
    author: '안동현',
    area: '서울',
    createdDate: '2023-06-08',
    stadium: '수원 HM파크',
    like: 77,
  },
  {
    userIcon: '최도원',
    reviewTitle: '매니저님 체고~ 나도 체고~',
    author: '김승섭',
    area: '수원',
    createdDate: '2023-06-08',
    stadium: '수원 HM파크',
    like: 20,
  },
  {
    userIcon: '최도원',
    reviewTitle: '안양 왕감자, 권성경이올시다',
    author: '권성경',
    area: '안양',
    createdDate: '2023-06-08',
    stadium: '수원 HM파크',
    like: 20,
  },
  {
    userIcon: '최도원',
    reviewTitle: '경기도 광주 OO매니저님 체고~',
    author: '신성민',
    area: '서울',
    createdDate: '2023-06-08',
    stadium: '수원 HM파크',
    like: 777,
  },
];
