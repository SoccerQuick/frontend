import react, { useState, useEffect } from 'react';
import { ReviewPost } from './SearchMyReviewPost';
import styled from 'styled-components';
import { GroupPost } from './SearchMyTeamPost';

type MyPostTableProps = {
  title?: string;
  properties?: string[];
  reviewData?: Array<ReviewPost>;
  groupData?: Array<GroupPost>;
};

function MyPostTable({
  title,
  properties,
  reviewData,
  groupData,
}: MyPostTableProps) {
  const customizeDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR');
  };
  return (
    <TableContainer>
      <StyledTitleDiv>{title}</StyledTitleDiv>
      <table>
        <thead>
          <StyledTitleTr key={title}>
            {''}
            {properties && properties.map((property) => <th>{property}</th>)}
            <th></th>
          </StyledTitleTr>
        </thead>
        <tbody>
          {reviewData &&
            reviewData.map((item, idx) => {
              return (
                <StyledItemTr key={`review-${idx}`}>
                  <td>{item.name}</td>
                  <StyledCommentTd>{item.comment}</StyledCommentTd>
                  <td>{'서울 구장'}</td>

                  <td>{item.rating}</td>
                  <td>{customizeDate(item.createdAt)}</td>
                  <td>
                    <button>조회</button>
                  </td>
                </StyledItemTr>
              );
            })}
          {groupData &&
            groupData.map((item, idx) => {
              return (
                <StyledItemTr key={`review-${idx}`}>
                  <td>{item.leader_name}</td>
                  <StyledCommentTd>{item.title}</StyledCommentTd>
                  <td>{item.location}</td>
                  <td>{item.status}</td>
                  <td>{`${item.gk_current_count}/${item.gk_count}`}</td>
                  <td>{`${item.player_current_count}/${item.player_count}`}</td>
                  <td>{customizeDate(item.createdAt)}</td>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > table {
    width: 100%;
  }
`;

const StyledTitleDiv = styled.div`
  width: 80%;
  font-weight: bold;
  margin-bottom: 1rem;
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
    flex: 2;
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
    flex: 2;
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StyledCommentTd = styled.td`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
