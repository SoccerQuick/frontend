import React from 'react';
import styled from 'styled-components';

type Applicant = {
  _id?: string;
  id: string;
  name: string;
  gender: string;
  position: string;
  level: string;
  contents: string;
};

function Comment(props: any) {
  const { data } = props;
  return (
    <>
      <div>테스팅 {data[0].gender}</div>
      <CommentBox>
        <table>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '6%' }}>이름</th>
              <th style={{ width: '6%' }}>성별</th>
              <th style={{ width: '13%' }}>포지션</th>
              <th style={{ width: '13%' }}>실력</th>
              <th style={{ width: '30%' }}>신청멘트</th>
              <th style={{ width: '12%' }}>수락/거절용 id</th>
              <th style={{ width: '10%' }}></th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((applicant: Applicant, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{applicant.name}</td>
                <td>{applicant.gender}</td>
                <td>
                  <StyledSpan>{applicant.position}</StyledSpan>
                </td>
                <td>
                  <StyledSpan>{applicant.level}</StyledSpan>
                </td>
                <td>{applicant.contents}</td>
                <td>{applicant._id?.slice(0, 4)}</td>
                <td>수락</td>
                <td>거절</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CommentBox>
    </>
  );
}

export default Comment;

const CommentBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 1.8rem;
  // background-color: beige;
  width: 100%;
  table {
    width: 100%;
  }

  tr {
    // display: flex;
    font-size: 1.6rem;
    justify-content: space-between;
    align-items: center;
  }
  td {
    // display: flex;
    font-size: 1.8rem;
    padding: 0.4rem;
    height: 4rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const StyledSpan = styled.span`
  padding: 0.4rem;
  margin: 0.5rem 0rem;
  border: 1px solid;
  width: fit-content;
  border-radius: 2rem;
`;
