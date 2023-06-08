import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

type Applicant = {
  _id?: string;
  id?: string;
  name?: string;
  gender?: string;
  position?: string;
  level?: string;
  contents?: string;
};

function Comment(props: any) {
  const { data } = props;
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const acceptMember = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/group/${url}/accept`, config)
      .then((res) => {
        console.log('멤버 수락 완료!: ', res.data);
      })
      .catch((e) => {
        console.error('뭔가 오류발생함 ㅎㅎㅜㅜ : ', e);
      });
  };
  const rejectMember = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/group/${url}/reject`, config)
      .then((res) => {
        console.log('멤버 거절 완료!: ', res.data);
      })
      .catch((e) => {
        console.error('뭔가 오류발생함 ㅎㅎㅜㅜ : ', e);
      });
  };

  return (
    <>
      <CommentBox>
        <table>
          <thead>
            <StyledTr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '6%' }}>이름</th>
              <th style={{ width: '6%' }}>성별</th>
              <th style={{ width: '13%' }}>포지션</th>
              <th style={{ width: '10%' }}>실력</th>
              <th style={{ width: '30%' }}>신청멘트</th>
              <th style={{ width: '12%' }}>수락/거절용 id</th>
              <th style={{ width: '12%' }}></th>
              <th style={{ width: '12%' }}></th>
            </StyledTr>
          </thead>
          <tbody>
            {data.map((applicant: Applicant, index: number) => (
              <StyledTr key={index}>
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
                <td>
                  <button onClick={acceptMember}>수락</button>
                </td>
                <td>
                  <button onClick={rejectMember}>거절</button>
                </td>
              </StyledTr>
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
  margin-top: 2rem;
  justify-content: space-evenly;
  font-size: 1.7rem;
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
    font-size: 1.5rem;
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

const StyledTr = styled.tr`
  height: 4rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;

  border-bottom: 0.1rem solid #dddddd;
`;
