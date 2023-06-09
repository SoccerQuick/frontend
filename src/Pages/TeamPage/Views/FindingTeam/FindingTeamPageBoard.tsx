import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import DropDown from '../../../../Components/Commons/DropDown';

type DropdownList = {
  option: string[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

type TableList = {
  title: string;
  body: string;
  style: { width: string };
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
  tableList: TableList[];
  handleReset: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  filteredData: filteredData[];
};

// SoccerQuick/Frontend/src/Pages/TeamPage/Views/FindingMember/FindingMember.tsx 166줄에서 넘어옴
function Board(props: BoardProps) {
  const { dropdownList, tableList, handleReset, filteredData } = props;

  return (
    <div style={{ width: '101rem' }}>
      <Teampage>
        <TeamPageOption>
          {dropdownList.map((list, idx) => (
            <DropDown
              key={idx}
              list={list.option}
              selected={list.state}
              setSelected={list.setState}
              style={{ width: '16rem' }}
            />
          ))}
          <button onClick={handleReset}>초기화</button>
        </TeamPageOption>
      </Teampage>
      <Teampage>
        <TeamPageBody>
          <table>
            <thead>
              <tr
                style={{
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #DDDDDD',
                }}
              >
                <th>순번</th>
                <th>Title</th>
                {tableList.map((item) => (
                  <th key={item.title}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <StyledTr key={item.group_id}>
                  <td style={{ width: '5%' }}>{filteredData.length - idx}</td>
                  <td style={{ width: '35%' }}>
                    <Link to={`./${item.group_id}`} state={{ data: item }}>
                      <StyledSpan>{item.title}</StyledSpan>
                    </Link>
                    <span style={{ marginLeft: '0.5rem', color: 'red' }}>
                      {item.applicant &&
                        item.applicant.length > 0 &&
                        `[${item.applicant?.length}]`}
                    </span>
                  </td>
                  {tableList.map((cell) => (
                    <td key={cell.body} style={cell.style}>
                      {item[cell.body as keyof typeof item] as React.ReactNode}
                    </td>
                  ))}
                </StyledTr>
              ))}
            </tbody>
          </table>
        </TeamPageBody>
      </Teampage>
    </div>
  );
}

export default Board;

const Teampage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.7rem;
`;

const TeamPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  // background-color: beige;
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

const StyledSpan = styled.span`
  &:hover {
    transform: scale(1.1);
    color: #8b8b8b;
    text-decoration: underline;
  }
`;
