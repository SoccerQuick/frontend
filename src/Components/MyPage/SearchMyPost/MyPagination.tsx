import react from 'react';
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
  const pageNumbers = [];
  const pages = Math.ceil(totalItemsCount / itemsPerPage);
  for (let i = 1; i <= pages; i++) {
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
        <StyledLi onClick={handlePrevClick}>{'<'}</StyledLi>
        {pageNumbers.map((number) => (
          <StyledLi key={number} currentPage={currentPage}>
            <div onClick={() => setCurrentPage(number)}>{number}</div>
          </StyledLi>
        ))}
        <StyledLi onClick={handleNextClick}>{'>'}</StyledLi>
      </StyledUl>
    </nav>
  );
}

export default MyPagination;

const StyledUl = styled.ul`
  display: flex;
  margin-top: 1rem;
`;

const StyledLi = styled.li<{ key?: number; currentPage?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.3rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  & > div {
    color: ${(props) => (props.key === props.currentPage ? 'red' : 'grey')};
  }
`;
