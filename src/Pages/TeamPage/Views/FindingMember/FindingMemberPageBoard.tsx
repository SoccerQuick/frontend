import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import DropDown from '../../../../Components/Commons/DropDown';
import resetIcon from '../../../../styles/icon/reset_black.svg';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../../../../store/selectors/authSelectors';

interface DropdownList {
  option: string[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface Applicant {
  id: string;
  position: string;
  level: string;
  contents: string;
}

interface filteredData {
  group_id?: string;
  area: string;
  author: string;
  body: string;
  gender: string;
  num: number;
  position?: string;
  skill?: string;
  status: string;
  title: string;
  gk: number;
  gkNeed: number;
  player: number;
  playerNeed: number;
  location: string;
  gk_count: number;
  gk_current_count: number;
  player_count: number;
  player_current_count: number;
  random_matched?: string;
  applicant?: Applicant[];
  [key: string]: string | number | undefined | Applicant[];
}

interface BoardProps {
  dropdownList: DropdownList[];
  handleReset: () => void;
  filteredData: filteredData[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentData: filteredData[];
  setCurrentData: React.Dispatch<React.SetStateAction<filteredData[]>>;
  totalPage: number;
}

function FindinMemberPageBoard(props: BoardProps) {
  const isLogin = useSelector(isLogInSelector);
  const location = useLocation();
  const {
    dropdownList,
    handleReset,
    filteredData,
    currentPage,
    setCurrentPage,
    currentData,
    setCurrentData,
    totalPage,
  } = props;

  React.useEffect(() => {
    setCurrentData(filteredData.slice((currentPage - 1) * 8, currentPage * 8));
  }, [currentPage]);

  // 포지션 체크하는 부분
  const checkPosition = (
    gk: number,
    gkNeed: number,
    player: number,
    playerNeed: number
  ) => {
    if (gk < gkNeed) {
      if (player < playerNeed) {
        return (
          <div>
            <p>
              필드플레이어&nbsp;
              <span>
                ({player}/{playerNeed})
              </span>
            </p>
            <p>
              골키퍼&nbsp;
              <span>
                ({gk}/{gkNeed})
              </span>
            </p>
          </div>
        );
      } else {
        return (
          <div>
            <p>
              골키퍼&nbsp;
              <span>
                ({gk}/{gkNeed})
              </span>
            </p>
          </div>
        );
      }
    } else if (player < playerNeed) {
      return (
        <div>
          <p>
            필드플레이어&nbsp;
            <span>
              ({player}/{playerNeed})
            </span>
          </p>
        </div>
      );
    } else return <div>-</div>;
  };

  return (
    <div style={{ width: '101rem', height: '65vh' }}>
      <Teampage>
        <StyledTotalNumber>
          총&nbsp; <b>{filteredData.length}</b>건
        </StyledTotalNumber>
        <TeamPageOption>
          {dropdownList.map((list, idx) => (
            <DropDown
              key={idx}
              list={list.option}
              selected={list.state}
              setSelected={list.setState}
            />
          ))}
          <StyledResetButton onClick={handleReset}>
            <img src={resetIcon} alt="" />
            초기화
          </StyledResetButton>
        </TeamPageOption>
      </Teampage>
      <Teampage>
        <TeamPageBody>
          <table>
            <thead>
              <StyledLabelTr>
                <th style={{ width: '17%' }}>지역</th>
                <th style={{ width: '35%' }}>제목</th>
                <th style={{ width: '13%' }}>작성자</th>
                <th style={{ width: '21%' }}>모집 포지션/모집 현황</th>
                <th style={{ width: '17%' }}>모집상태</th>
              </StyledLabelTr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                currentData.map((item, idx) => (
                  <StyledTr key={item.group_id}>
                    <td style={{ width: '17%' }}>{item.area}</td>
                    <td style={{ width: '35%' }}>
                      <Link to={`./${item.group_id}`} state={{ data: item }}>
                        <StyledTitle>{item.title}</StyledTitle>
                      </Link>{' '}
                      <span style={{ marginLeft: '0.5rem', color: 'red' }}>
                        {item.applicant &&
                          item.applicant.length > 0 &&
                          `[${item.applicant?.length}]`}
                      </span>
                    </td>
                    <td style={{ width: '13%' }}>{item.author}</td>
                    <StyledPositionTd style={{ width: '21%' }}>
                      {checkPosition(
                        item.gk_current_count,
                        item.gk_count,
                        item.player_current_count,
                        item.player_count
                      )}
                    </StyledPositionTd>
                    <td style={{ width: '17%' }}>
                      <StyledStatusTd status={item.status}>
                        {item.status}
                      </StyledStatusTd>
                    </td>
                  </StyledTr>
                ))
              ) : (
                <tr style={{ height: '52vh' }}>
                  <td colSpan={5}>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'grey',
                      }}
                    >
                      검색 결과가 없습니다.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TeamPageBody>
      </Teampage>
      <TeamPageFooter>
        {isLogin && (
          <Link
            to="/teampage/submit"
            style={{
              display:
                location.pathname === '/teampage/submit' ? 'none' : 'flex',
            }}
          >
            <StyledWriteButton>글 작성하기</StyledWriteButton>
          </Link>
        )}
      </TeamPageFooter>
      <PageSelect>
        {Array.from({ length: totalPage }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => {
              setCurrentPage(index + 1);
            }}
            selected={index + 1}
            currentPage={currentPage}
          >
            [{index + 1}]
          </PageButton>
        ))}
      </PageSelect>
    </div>
  );
}

export default FindinMemberPageBoard;

const Teampage = styled.div`
  display: flex;
  width: 98.4rem;
  justify-content: space-between;
  font-size: 1.7rem;
`;

const StyledTotalNumber = styled.p`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  font-size: 1.8rem;
  color: #5e5d5d;
`;

const TeamPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  table {
    width: 100%;
  }

  td {
    font-size: 1.7rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    :first-child {
      text-align: start;
      padding-left: 2rem;
    }
    :nth-child(2) {
      text-align: start;
    }
  }
`;

const StyledLabelTr = styled.tr`
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding-bottom: 1rem;
  background-color: #fafafa;
  border-bottom: 1px solid #d5d5d5ae;
  box-shadow: 0px 5px 5px -5px #cbc9c9d5;
  th {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const TeamPageOption = styled.div`
  display: flex;
  margin: 10px 0;
`;

const StyledResetButton = styled.button`
  background-color: #fff;
  display: flex;
  justify-content: space-between;

  align-items: center;
  color: #333;
  padding: 0 1.8rem;

  border: 1px solid #ddd;
  border-radius: 1rem;
  font-size: 1.9rem;
  img {
    width: 2.4rem;
    margin-right: 0.5rem;
  }
`;

const StyledTr = styled.tr`
  height: 8rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;

  border-bottom: 0.1rem solid #dddddd;
`;

const StyledTitle = styled.p`
  max-width: 30rem;
  font-size: 1.8rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  &:hover {
    transform: scale(1.1);
    color: #8b8b8b;
    text-decoration: underline;
  }
`;

const StyledPositionTd = styled.td`
  div {
    width: 17rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      font-weight: 500;
      color: #727272;
      /* background-color: #fafafa; */
      :first-child {
        margin-bottom: 0.4rem;
        span {
          color: #2f7fe8;
        }
        :before {
          content: '• ';
          color: #2f7fe8;
        }
      }
      :last-child {
        span {
          color: #e8452f;
        }
        :before {
          content: '• ';
          color: #e8452f;
        }
      }
    }
  }
`;

const StyledStatusTd = styled.div<{ status: string }>`
  height: 3rem;
  width: 9rem;
  padding: 0.2rem 1rem 0.3rem 1rem;
  margin: auto;
  border: 0.1rem solid #eeeeee;
  border-radius: 0.7rem;
  font-size: 1.6rem;
  font-weight: 400;

  color: ${({ status }) => (status === '모집중' ? 'green' : 'gray')};
  background-color: ${({ status }) =>
    status === '모집중' ? '#e6ffeb' : '#eeeeee'};
`;

const TeamPageFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  margin-top: 3rem;
  margin-right: 3rem;
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

const PageSelect = styled.div`
  clear: both;
  margin-top: 11rem;
  justify-content: center;
  display: flex;
  border-top: 1px solid #ddd;
`;

const PageButton = styled.button<{ selected: number; currentPage: number }>`
  border: none;
  margin: 0;
  padding: 0.2rem;
  text-decoration: none;
  font-size: 1.9rem;
  color: ${(props) =>
    props.selected === props.currentPage ? 'blue' : 'black'};
  background-color: white;
  font-weight: ${(props) =>
    props.selected === props.currentPage ? 'bold' : 'normal'};

  &:hover {
    text-decoration: underline;
    color: gray;
  }

  &.selected {
    font-weight: bold;
  }
`;
