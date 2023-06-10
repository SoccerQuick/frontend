import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';
import styled from 'styled-components';
import ballIcon from '../../../styles/icon/soccerball.svg';
import checkIcon from '../../../styles/icon/check_white.svg';
import commentIcon from '../../../styles/icon/comment.svg';
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
          `${process.env.REACT_APP_API_URL}/groups/${url}/accept`,
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
    const confirmed = window.confirm('거절하시겠습니까?');
    if (confirmed) {
      const body = {
        user_id: id,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/groups/${url}/reject`,
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
    <StyledCommentContainer>
      <div>
        <StyledCommentTitle>
          <img src={commentIcon} alt="" />
          신청 목록
        </StyledCommentTitle>

        {data.map((applicant: Applicant, index: number) => (
          <CommentLiContainer key={index}>
            <StyledAuthorDiv gender={applicant.gender}>
              <StyledImgDiv>
                <img src={ballIcon} alt="BallIcon" />
              </StyledImgDiv>
              <p>{applicant.name}</p>
            </StyledAuthorDiv>
            <StyledContents>{applicant.contents}</StyledContents>
            {/* {user === userData?.nickname && ( */}
            <StyledCommentDetailDiv>
              <StyledGender gender={applicant.gender}>
                #{applicant.gender}
              </StyledGender>
              <StyledPosition position={applicant.position}>
                #
                {applicant.position === '상관없음'
                  ? '포지션 무관'
                  : applicant.position}
              </StyledPosition>
              <StyledLevel level={applicant.level}>
                #{applicant.level}
              </StyledLevel>
            </StyledCommentDetailDiv>

            <StyledCommentButtons>
              <button onClick={() => rejectMember(applicant.id)}>거절</button>
              <button onClick={() => acceptMember(applicant.id)}>
                <img src={checkIcon} alt="" /> 수락
              </button>
            </StyledCommentButtons>
            {/* )} */}
          </CommentLiContainer>
        ))}
      </div>
    </StyledCommentContainer>
  );
}

export default Comment;

const StyledCommentContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  border-top: 0.1rem solid lightgray;
`;

const StyledCommentTitle = styled.h2`
  font-size: 2.2rem;
  padding: 1rem 0;
  img {
    width: 4.3rem;
    vertical-align: middle;
    margin-right: 0.4rem;
  }
`;

const CommentLiContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 2rem;
  filter: drop-shadow(0 0 0.2rem #c6c6c6);
  :not(first-child) {
    margin-top: 2rem;
  }
`;

const StyledAuthorDiv = styled.div<{ gender?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1rem;
  p {
    font-size: 1.8rem;
    padding-left: 1rem;
  }
`;

const StyledImgDiv = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  border: 0.2rem solid lightgray;
`;

const StyledCommentDetailDiv = styled.div`
  font-size: 1.7rem;
  padding: 0.7rem 0;
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 0.6rem;
  }
  span {
    font-weight: 400;
    padding: 0 0.8rem;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }
`;

const StyledGender = styled.span<{ gender?: string }>`
  color: ${({ gender }) => (gender === '여' ? '#ba4d1e' : '#17879d')};
  background-color: ${({ gender }) =>
    gender === '여' ? '#fcf6f6' : '#f6fbfc'};
`;

const StyledPosition = styled.span<{ position: string }>`
  color: ${({ position }) => getColorByPosition(position)};
  background-color: #f8f7f7;
`;

const getColorByPosition = (data: string) => {
  if (data === '골키퍼') {
    return 'rgb(232, 101, 47)';
  } else if (data === '필드플레이어') {
    return 'rgb(103, 109, 178)';
  } else if (data === '상관없음') {
    return '#616161';
  }
};

const StyledLevel = styled.span<{ level: string }>`
  color: ${({ level }) => getColorBySkill(level)};
  background-color: ${({ level }) => getBackgroundColorBySkill(level)};
`;

const getColorBySkill = (data: string) => {
  if (data === '프로') {
    return 'white';
  } else if (data === '세미프로') {
    return '#883532';
  } else if (data === '고급자') {
    return '#233D87';
  } else if (data === '중급자') {
    return '#B78638';
  } else if (data === '초급자') {
    return '#336939';
  } else if (data === '입문자') {
    return '#525056';
  }
};
const getBackgroundColorBySkill = (data: string) => {
  if (data === '프로') {
    return '#848484';
  } else if (data === '세미프로') {
    return '#FAE4E3';
  } else if (data === '고급자') {
    return '#ECF0FB)';
  } else if (data === '중급자') {
    return '#E6FAEA';
  } else if (data === '초급자') {
    return '#FDF1DC';
  } else if (data === '입문자') {
    return '#F2F1F1';
  }
};

const StyledContents = styled.div`
  font-size: 2rem;
  padding: 1rem 0;
`;

const StyledCommentButtons = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    width: 11rem;
    height: 4.5rem;
    border-radius: 0.7rem;
    background-color: var(--color--green);
    color: white;
    font-size: 1.7rem;
    font-weight: 600;
    img {
      width: 2rem;
      vertical-align: middle;
      padding: 0 0.3rem 0.2rem 0;
    }

    :first-child {
      margin-right: 1rem;
      background-color: white;
      color: #787878;
      filter: drop-shadow(0 0 0.1rem grey);
    }
  }
`;
