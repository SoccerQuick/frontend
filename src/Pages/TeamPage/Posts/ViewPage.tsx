import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import HtmlParser from '../../../Components/Commons/HtmlParser';
import { useSelector } from 'react-redux';
import {
  isLogInSelector,
  userSelector,
} from '../../../store/selectors/authSelectors';
import SubmitForFindingMember from '../../../Components/TeamPage/SubmitModal/SubmitForFindingMember';
import TeamPageComments from '../../../Components/TeamPage/Comments/TeamPageComments';
import chevronIcon from '../../../styles/icon/chevron_green.svg';
import ballIcon from '../../../styles/icon/soccerball.svg';
import playerIcon from '../../../styles/icon/player.svg';
import goalKeeperIcon from '../../../styles/icon/goalkeeper.svg';
import axios from 'axios';

const initialData = {
  group_id: '',
  location: '',
  leader_name: '',
  author: '',
  contents: '',
  gender: '',
  num: '',
  position: '',
  skill: '',
  status: '',
  title: '',
  gk_count: 0,
  gk_current_count: 0,
  player_count: 0,
  player_current_count: 0,
  random_matched: '',
  applicant: [],
  accept: [],
};

function DetailPage() {
  // 글 작성자인지 확인하기 위한 데이터
  const userData = useSelector(userSelector);
  const isLogin = useSelector(isLogInSelector);
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  //DB에서 받아올 데이터를 저장하는 필드로, 애니타입을 선언하였음. 이후의 데이터는 포맷팅하여 타입 관리함.
  const [data, setData] = React.useState<any>(initialData);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/groups/${url}`)
      .then((res) => {
        const item = res.data.data;
        const formattedData = {
          ...item,
          author: item.leader_name,
          gk: item.gk_current_count,
          gkNeed: item.gk_count,
          player: item.player_current_count,
          playerNeed: item.player_count,
          area: item.location,
        };

        setData(formattedData);
      })
      .catch((error) => {
        setData(initialData);
        console.log('데이터를 못 가져왔어요..');
      });
  }, []);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
  // 삭제 요청을 보내는 버튼
  const deletePostHandler = () => {
    const confirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmed) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/groups/${url}`, config)
        .then((res) => {
          alert('게시글이 삭제되었습니다.');
          console.log('삭제 성공');
          navigate('/teampage/team');
        })
        .catch((error) => {
          console.log('삭제 실패');
        });
    }
  };

  return (
    <StyledWrap>
      <StyledPost>
        <StyledHeader status={data.status}>
          <StyledBoardName
            onClick={() => {
              navigate(`/teampage/team`);
            }}
          >
            <div>
              <img src={chevronIcon} alt="chevronIcon" />
              팀원 모집・신청
            </div>
          </StyledBoardName>

          <h1>
            <span>[{data.status}] </span>
            {data.title}
          </h1>
          <StyledAuthorDiv>
            <StyledImgDiv>
              <img src={ballIcon} alt="BallIcon" />
            </StyledImgDiv>
            <p>{data.author}</p>
          </StyledAuthorDiv>
        </StyledHeader>
        <StyledDetailDiv>
          <h3>모집 정보</h3>
          <StyledDetailLocationLi>
            <StyledDetailLabel>활동 지역</StyledDetailLabel>
            <p>{data.area}</p>
          </StyledDetailLocationLi>
          <div>
            <StyledDetailLabel>모집 현황</StyledDetailLabel>
            <StyledPositionContainer>
              <StyledPosition>
                <StyledPositionIcon>
                  <img src={playerIcon} alt="playerIcon" />
                </StyledPositionIcon>
                <StyledPositionName>
                  <div>필드플레이어</div>
                  <div>
                    {data.playerNeed - data.player > 0
                      ? `${data.playerNeed - data.player}자리 남았어요!`
                      : '마감되었어요.'}
                  </div>
                </StyledPositionName>
                <StyledPositionDetail>
                  <p>
                    현재<span>{data.player}</span>명
                  </p>
                </StyledPositionDetail>
                <StyledPositionDetail>
                  <p>
                    총<span> {data.playerNeed}</span>명 모집 예정
                  </p>
                </StyledPositionDetail>
              </StyledPosition>
              <StyledPosition>
                <StyledPositionIcon color="green">
                  <img src={goalKeeperIcon} alt="playerIcon" />
                </StyledPositionIcon>
                <StyledPositionName>
                  <div>골키퍼</div>
                  <div>
                    {data.gk_count - data.gk > 0
                      ? `${data.gkNeed - data.gk}자리 남았어요!`
                      : '마감되었어요.'}
                  </div>
                </StyledPositionName>
                <StyledPositionDetail color="green">
                  <p>
                    현재<span>{data.gk}</span>명
                  </p>
                </StyledPositionDetail>
                <StyledPositionDetail color="green">
                  <p>
                    총<span> {data.gkNeed}</span>명 모집 예정
                  </p>
                </StyledPositionDetail>
              </StyledPosition>
            </StyledPositionContainer>
          </div>
        </StyledDetailDiv>
        <StyledBody>
          <h3>상세 내용</h3>
          <div>
            <HtmlParser data={data.contents} />
          </div>
        </StyledBody>
        <StyledAuthorButtonContainer>
          {userData?.name === data.author && (
            <Link to={`/teampage/edit/${url}`} state={data}>
              <button>수정</button>
            </Link>
          )}
          {(userData?.name === data.author ||
            userData?.role === 'admin' ||
            userData?.role === 'manager') && (
            <button onClick={deletePostHandler}>삭제</button>
          )}
          {(userData?.name === data.author ||
            userData?.role === 'admin' ||
            userData?.role === 'manager') && (
            <button
              onClick={() => {
                console.log(data.accept);
              }}
            >
              조회
            </button>
          )}
        </StyledAuthorButtonContainer>
      </StyledPost>
      <div>
        <StyledCommentsDiv>
          {/* applicant가 있으면 Comment 컴포넌트를 불러온다. */}
          {data.applicant?.length > 0 && (
            <TeamPageComments data={data.applicant} user={data.author} />
          )}
        </StyledCommentsDiv>
      </div>
      <div>
        <StyledFooter>
          <button
            onClick={() => {
              navigate(`/teampage/team`);
            }}
          >
            목록으로
          </button>
          {isLogin && userData?.nickname !== data.author && (
            <button
              onClick={() => {
                setShowModal(true);
              }}
            >
              함께하기
            </button>
          )}
        </StyledFooter>
        {showModal && (
          <SubmitForFindingMember
            setShowModal={setShowModal}
            groupId={data.group_id}
          />
        )}
      </div>
    </StyledWrap>
  );
}

export default DetailPage;

const StyledWrap = styled.div`
  width: 98.4rem;
  margin: 3rem auto;
`;

const StyledPost = styled.div`
  border: 0.2rem solid lightgray;
  border-radius: 2rem;

  padding: 2.5rem;
`;

const StyledHeader = styled.div<{ status: string }>`
  border-bottom: 0.2rem solid lightgray;
  h1 {
    font-size: 2.5em;
    font-weight: 600;
    span {
      color: ${({ status }) =>
        status === '모집중' ? 'var(--color--green)' : 'gray'};
    }
  }
`;

const StyledBoardName = styled.div`
  color: #71c171;
  font-size: 1.7rem;
  font-weight: 600;
  padding: 0.3rem 0;
  display: inline-block;
  cursor: pointer;
  img {
    width: 0.8rem;
    vertical-align: middle;
    padding: 0 0 0.3rem 0;
    margin-right: 0.3rem;
  }
`;

const StyledAuthorDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 2rem;
  p {
    font-size: 1.8rem;
    padding-left: 1rem;
  }
`;

const StyledImgDiv = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  border: 0.2rem solid lightgray;
`;

const StyledDetailDiv = styled.div`
  font-size: 2rem;

  padding: 2rem 0;
  h3 {
    font-size: 2.2rem;
  }
`;

const StyledDetailLabel = styled.div`
  color: gray;
  padding-right: 2rem;
`;

const StyledDetailLocationLi = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1.3rem;
`;

const StyledPositionContainer = styled.div`
  padding-top: 1rem;
`;

const StyledPosition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  filter: drop-shadow(0 0 0.2rem #a2a2a2);
  border-radius: 2rem;
  background: white;
  margin: 1.5rem 0;
  div:nth-child(2) {
    width: 40%;
  }
`;

const StyledPositionIcon = styled.div<{ color?: string }>`
  width: 8rem;
  height: 8rem;
  background: ${({ color }) =>
    color === 'green' ? 'var(--color--green)' : 'orange'};
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  img {
    width: 5.6rem;
    margin: ${({ color }) =>
      color === 'green' ? '1rem 0 0 0.7rem' : '0.4rem 0 0 0.7rem'};
  }
`;

const StyledPositionName = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: #5e5c5c;
  div:last-child {
    font-size: 1.6rem;
    color: #ff5500;
    font-weight: 500;
  }
`;

const StyledPositionDetail = styled.div<{ color?: string }>`
  p {
    font-size: 1.8rem;
    span {
      font-size: 3rem;
      font-weight: 500;
      color: ${({ color }) => (color === 'green' ? '#00ac00' : 'orange')};
      vertical-align: sub;
      padding: 0 0.4rem;
    }
  }
  padding-right: 5rem;
`;

const StyledBody = styled.div`
  min-height: 20rem;
  padding: 2rem 0;
  h3 {
    font-size: 2.2rem;
  }
`;

const StyledAuthorButtonContainer = styled.div`
  margin: 2rem auto;
  display: flex;
  height: 3rem;
  justify-content: flex-end;
  button {
    color: gray;
    background-color: white;
  }
  button:not(:first-child):before {
    content: '|';
    padding-right: 1.5rem;
    color: lightgray;
  }
`;

const StyledCommentsDiv = styled.div`
  width: 100%;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
  button {
    width: 11rem;
    height: 4.5rem;
    border-radius: 0.7rem;
    background-color: var(--color--green);
    color: white;
    font-size: 1.7rem;
    font-weight: 600;

    :first-child {
      margin-right: 1rem;
      background-color: white;
      color: #787878;
      filter: drop-shadow(0 0 0.2rem grey);
    }
  }
`;
