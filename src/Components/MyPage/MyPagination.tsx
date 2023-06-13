import react, { useState } from 'react';
import styled from 'styled-components';

type MyPaginationProps = {
  totalItemsCount: number; // 총 데이터 수
  itemsPerPage: number; // 한 페이지당 보여주는 데이터 수
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

function MyPagination({
  totalItemsCount,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}: MyPaginationProps) {
  const [pageGroup, setPageGroup] = useState(5);
  const pages = Math.ceil(totalItemsCount / itemsPerPage);
  const firstIndexOfPage =
    currentPage % pageGroup
      ? Math.floor(currentPage / pageGroup) * pageGroup + 1
      : Math.floor((currentPage - 1) / pageGroup) * pageGroup + 1;
  const lastIndexOfPage = Math.ceil(currentPage / pageGroup) * pageGroup;

  const pageNumbers = [];

  for (let i = firstIndexOfPage; i <= lastIndexOfPage; i++) {
    if (pages < i) {
      break;
    }
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    setCurrentPage((prev) => {
      if (prev - 1 > 0) {
        return prev - 1;
      } else {
        return 1;
      }
    });
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => {
      if (prev + 1 < pages) {
        return prev + 1;
      } else {
        return pages;
      }
    });
  };

  return (
    <nav>
      <StyledUl className="pagination">
        <StyledLi
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          {'<<'}
        </StyledLi>
        <StyledLi onClick={handlePrevClick}>{'<'}</StyledLi>
        {pageNumbers.map((number) => {
          if (number !== currentPage) {
            return (
              <StyledLi key={number}>
                <div onClick={() => setCurrentPage(number)}>{number}</div>
              </StyledLi>
            );
          } else {
            return (
              <StyledBoldLi key={number}>
                <div onClick={() => setCurrentPage(number)}>{number}</div>
              </StyledBoldLi>
            );
          }
        })}
        <StyledLi onClick={handleNextClick}>{'>'}</StyledLi>
        <StyledLi
          onClick={() => {
            setCurrentPage(pages);
          }}
        >
          {'>>'}
        </StyledLi>
      </StyledUl>
    </nav>
  );
}

export default MyPagination;

const StyledUl = styled.ul`
  display: flex;
  margin-top: 1rem;
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.3rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  color: grey;
`;

const StyledBoldLi = styled(StyledLi)`
  color: black;
  font-weight: bold;
`;
