import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import DropDown from '../../../../Components/Commons/DropDown';
import resetIcon from '../../../../styles/icon/reset_black.svg';

type DropdownList = {
  option: string[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

type Applicant = {
  id: string;
  position: string;
  level: string;
  contents: string;
};

type filteredData = {
  applicant?: Applicant[];
  group_id?: string;
  num: number;
  title: string;
  leader_name?: string;
  author?: string;
  location: string;
  status: string;
  position?: string;
  skill?: string;
  gender: string;
  body: string;

  gk_count: number;
  gk_current_count: number;
  player_count: number;
  player_current_count: number;
};

type modalDataProps = {
  applicant?: Applicant[];
  group_id?: string;
  location: string;
  leader_name?: string;
  author?: string;
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
};

type BoardProps = {
  dropdownList: DropdownList[];
  handleReset: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // setModalData: React.Dispatch<React.SetStateAction<modalDataProps>>;
  filteredData: filteredData[];
  // data: any;
};

// SoccerQuick/Frontend/src/Pages/TeamPage/Views/FindingMember/FindingMember.tsx 166줄에서 넘어옴
function FindinMemberPageBoard(props: BoardProps) {
  const {
    dropdownList,
    handleReset,
    // setShowModal,
    // setModalData,
    filteredData,
    // data,
  } = props;

  const checkPosition = (
    gk_current_count: number,
    gk_count: number,
    player_current_count: number,
    player_count: number
  ) => {
    if (gk_current_count < gk_count) {
      if (player_current_count < player_count) {
        return (
          <div>
            <p>
              필드플레이어&nbsp;
              <span>
                ({player_current_count}/{player_count})
              </span>
            </p>
            <p>
              골키퍼&nbsp;
              <span>
                ({gk_current_count}/{gk_count})
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
                ({gk_current_count}/{gk_count})
              </span>
            </p>
          </div>
        );
      }
    } else if (player_current_count < player_count) {
      return (
        <div>
          <p>
            필드플레이어&nbsp;
            <span>
              ({player_current_count}/{player_count})
            </span>
          </p>
        </div>
      );
    } else return <div>-</div>;
  };

  return (
    <div style={{ width: '101rem' }}>
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
                <th>지역</th>
                <th>제목</th>
                <th>작성자</th>
                <th>모집 포지션/모집 현황</th>
                <th>모집상태</th>
              </StyledLabelTr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <StyledTr key={item.group_id}>
                  <td style={{ width: '15%' }}>{item.location}</td>
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
                  <td>{item.author}</td>
                  <StyledPositionTd>
                    {checkPosition(
                      item.gk_current_count,
                      item.gk_count,
                      item.player_current_count,
                      item.player_count
                    )}
                  </StyledPositionTd>
                  <td>
                    <StyledStatusTd status={item.status}>
                      {item.status}
                    </StyledStatusTd>
                  </td>
                </StyledTr>
              ))}
            </tbody>
          </table>
        </TeamPageBody>
      </Teampage>
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
      padding-left: 3rem;
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
  font-size: 1.8rem;
  font-weight: 500;
  display: inline;
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
