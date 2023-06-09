import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';
import styled from 'styled-components';
import axios from 'axios';

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
  const { data, user } = props;

  // 글 작성자인지 확인하기 위한 데이터
  const userData = useSelector(userSelector);

  // API 요청을 보내기 위한 파라미터 수집
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  // 멤버를 승인하는 핸들러
  const acceptMember = (id: string) => {
    const confirmed = window.confirm('정말로 수락하시겠습니까?');
    if (confirmed) {
      const body = {
        user_id: id,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/group/${url}/accept`,
          body,
          config
        )
        .then((res) => {
          console.log('멤버 수락 완료!: ', res.data);
          alert('멤버 수락 완료!');
          window.location.reload();
        })
        .catch((e) => {
          console.error('뭔가 오류발생함 ㅎㅎㅜㅜ : ', e);
        });
    }
  };

  // 멤버를 거절하는 핸들러
  const rejectMember = (id: string) => {
    const confirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmed) {
      const body = {
        user_id: id,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/group/${url}/reject`,
          body,
          config
        )
        .then((res) => {
          console.log('멤버 거절 완료!: ', res.data);
          alert('멤버 거절 완료!');
          window.location.reload();
        })
        .catch((e) => {
          console.error('뭔가 오류발생함 ㅎㅎㅜㅜ : ', e);
        });
    }
  };

  return (
    <>
      <button
        onClick={() => {
          console.log('데이터 : ', data, '닉네임 :', userData?.nickname);
        }}
      >
        유저정보체크
      </button>
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
              <th style={{ width: '10%' }}></th>
              <th style={{ width: '10%' }}></th>
            </StyledTr>
          </thead>
          <tbody>
            {data.map((applicant: Applicant, index: number) => (
              <StyledTr key={index}>
                <td>{index + 1}</td>
                <td>{applicant.name}</td>
                <td>{applicant.gender}</td>
                <td>
                  <StyledPositionSpan data={applicant.position}>
                    {applicant.position}
                  </StyledPositionSpan>
                </td>
                <td>
                  <StyledSkillSpan data={applicant.level}>
                    {applicant.level}
                  </StyledSkillSpan>
                </td>
                <td>{applicant.contents}</td>
                {user === userData?.nickname && (
                  <>
                    <td>
                      <StyledButton onClick={() => acceptMember(applicant.id)}>
                        ✔️수락
                      </StyledButton>
                    </td>
                    <td>
                      <StyledButton onClick={() => rejectMember(applicant.id)}>
                        ❌거절
                      </StyledButton>
                    </td>
                  </>
                )}
              </StyledTr>
            ))}
          </tbody>
        </table>
      </CommentBox>
      <div
        style={{
          padding: '1.3rem',
          marginTop: '3rem',
          border: '1px solid',
          borderRadius: '1rem',
          width: '90rem',
        }}
      >
        <div>
          포지션/실력 박스 색상 모음 - 이거 지우면 아래 버튼 올라오니 걱정ㄴㄴ
        </div>
        <div>
          <StyledPositionSpan data={'골키퍼'}>골키퍼</StyledPositionSpan>
          <StyledPositionSpan data={'필드플레이어'}>
            필드플레이어
          </StyledPositionSpan>
          <StyledPositionSpan data={'상관없음'}>상관없음</StyledPositionSpan>
        </div>
        <div>
          <StyledSkillSpan data={'프로'}>프로</StyledSkillSpan>
          <StyledSkillSpan data={'세미프로'}>세미프로</StyledSkillSpan>
          <StyledSkillSpan data={'고급자'}>고급자</StyledSkillSpan>
          <StyledSkillSpan data={'중급자'}>중급자</StyledSkillSpan>
          <StyledSkillSpan data={'초급자'}>초급자</StyledSkillSpan>
          <StyledSkillSpan data={'입문자'}>입문자</StyledSkillSpan>
        </div>
      </div>
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
    font-size: 1.7rem;
    padding: 0.4rem;
    height: 4rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const StyledPositionSpan = styled.span<{ data: string }>`
  display: inline-block;
  width: 11rem;
  text-align: center;
  padding: 0.4rem;
  margin: 0.5rem 0.4rem;
  border: 1px solid;
  width: fit-content;
  border-radius: 2rem;
  font-weight: 700;
  color: ${({ data }) => getColorByPosition(data)};
  background-color: ${({ data }) => getBackgroundColorByPosition(data)};
`;

const getColorByPosition = (data: string) => {
  if (data === '골키퍼') {
    return '#061822';
  } else if (data === '플레이어') {
    // return 'rgb(33, 133, 33)';
    return '#061822';
  } else if (data === '상관없음') {
    // return '#2079ff';
    return '#061822';
  }
};
const getBackgroundColorByPosition = (data: string) => {
  if (data === '골키퍼') {
    return '#fcfcb6';
  } else if (data === '필드플레이어') {
    return 'rgb(255,231,0)';
  } else if (data === '상관없음') {
    return '#63e494';
  }
};

const StyledSkillSpan = styled.span<{ data: string }>`
  display: inline-block;
  width: 11rem;
  text-align: center;
  padding: 0.4rem;
  margin: 0.5rem 0.4rem;
  border: 1px solid;
  border-radius: 2rem;
  font-weight: 700;
  color: ${({ data }) => getColorBySkill(data)};
  background-color: ${({ data }) => getBackgroundColorBySkill(data)};
`;

const getColorBySkill = (data: string) => {
  if (data === '프로') {
    return 'rgb(34, 90, 202)';
  } else if (data === '세미프로') {
    return 'rgb(10,58,47)';
  } else if (data === '고급자') {
    return 'rgb(100,68,35)';
  } else if (data === '중급자') {
    return 'rgb(51,55,59)';
  } else if (data === '초급자') {
    return 'rgb(89,61,56)';
  } else if (data === '입문자') {
    return 'rgb(61,46,43)';
  }
};
const getBackgroundColorBySkill = (data: string) => {
  if (data === '프로') {
    return 'rgb(141, 221, 248)';
  } else if (data === '세미프로') {
    return 'rgb(90, 219, 213)';
  } else if (data === '고급자') {
    return 'rgb(240, 222, 164)';
  } else if (data === '중급자') {
    return 'rgb(162, 187, 233)';
  } else if (data === '초급자') {
    return 'rgb(255, 190, 165)';
  } else if (data === '입문자') {
    return 'rgb(223, 187, 187)';
  }
};

const StyledTr = styled.tr`
  height: 4rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;

  border-bottom: 0.1rem solid #dddddd;
`;

const StyledButton = styled.button`
  background-color: white;
  &:hover {
    /* color: blue; */
    /* text-decoration: underline; */
    transform: scale(1.1);
  }
`;
