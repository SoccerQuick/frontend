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
// import SubmitForFindingTeam from '../../../Components/TeamPage/SubmitModal/SubmitForFindingTeam';
import TeamPageComments from '../../../Components/TeamPage/Comments/TeamPageComments';
import BallIcon from '../../../styles/icon/soccerball.svg';
import axios from 'axios';

type DetailList = {
  title: string;
  value: string;
};

// type Applicant = {
//   id: string;
//   position: string;
//   level: string;
//   contents: string;
// };

// type DataProps = {
//   group_id?: string;
//   location: string;
//   author: string;
//   body: string;
//   gender: string;
//   position?: string;
//   skill?: string;
//   status: string;
//   title: string;
//   gk_count?: number;
//   gk_current_count?: number;
//   player_count?: number;
//   player_current_count?: number;
//   random_matched?: string;
//   applicant?: Applicant[];
//   [key: string]: string | number | undefined | Applicant[];
// };

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

type DetailListProps = {
  detailList: DetailList[];
};

function DetailPage(props: DetailListProps) {
  // 글 작성자인지 확인하기 위한 데이터
  const userData = useSelector(userSelector);
  const isLogin = useSelector(isLogInSelector);
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const { detailList } = props;
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const [data, setData] = React.useState<any>(initialData); // <<<<<<<<<<< any 타입 정의를 해야되는데 좀 어려움
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/groups/${url}`)
      .then((res) => {
        const formattedData = {
          ...res.data.data,
          author: res.data.data.leader_name,
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
  console.log(detailList);

  return (
    <StyledWrap>
      <StyledHeader status={data.status}>
        <StyledBoardName>팀원 모집・신청</StyledBoardName>

        <h1>
          <span>[{data.status}] </span>
          {data.title}
        </h1>
        <StyledAuthorDiv>
          <StyledImgDiv>
            <img src={BallIcon} alt="BallIcon" />
          </StyledImgDiv>
          <p>{data.author}</p>
        </StyledAuthorDiv>
      </StyledHeader>
      <StyledDetailDiv>
        <h3>모집 상세</h3>
        <div>
          <StyledDetailLocationLi>
            <StyledDetailLabel>활동 지역</StyledDetailLabel>
            <p>{data.location}</p>
          </StyledDetailLocationLi>
          <StyledDetailLi>
            <StyledDetailLabel>모집 현황</StyledDetailLabel>
            <div>
              <StyledDetailPosition>
                <p>필드플레이어</p>
                <div>
                  {data.player_current_count}명/{data.player_count}명
                </div>
              </StyledDetailPosition>
              <StyledDetailPosition>
                <p>골키퍼</p>
                <div>
                  {data.gk_current_count}명/{data.gk_count}명
                </div>
              </StyledDetailPosition>
            </div>
          </StyledDetailLi>
        </div>
        {/* {detailList.map((item: DetailList) => (
          <StyledDetailLi key={item.title}>
            <div>{item.title}</div>
            <div>{data[item.value]}</div>
          </StyledDetailLi>
        ))} */}
      </StyledDetailDiv>

      <StyledBody>
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
        {(userData?.name === data.author || userData?.role !== 'user') && (
          <button onClick={deletePostHandler}>삭제</button>
        )}
        {(userData?.name === data.author || userData?.role !== 'user') && (
          <button
            onClick={() => {
              console.log(data.accept);
            }}
          >
            조회
          </button>
        )}
      </StyledAuthorButtonContainer>
      <div>
        <div style={{ width: '100rem' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {/* applicant가 있으면 Comment 컴포넌트를 불러온다. */}
            {data.applicant?.length > 0 && (
              <TeamPageComments data={data.applicant} user={data.author} />
            )}
          </div>
        </div>
      </div>
      <div>
        <StyledFooter>
          <button
            onClick={() => {
              navigate(`/teampage/team`);
            }}
          >
            돌아가기
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
        {showModal &&
          (data.leader_name ? (
            <SubmitForFindingMember
              setShowModal={setShowModal}
              groupId={data.group_id}
            />
          ) : (
            ''
            // <SubmitForFindingTeam setShowModal={setShowModal} />
          ))}
      </div>
    </StyledWrap>
  );
}

export default DetailPage;

const StyledWrap = styled.div`
  width: 98.4rem;
  margin: auto;
  border: 0.2rem solid lightgray;
  border-radius: 2rem;
  padding: 2rem;
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
  font-size: 1.9rem;
  margin-bottom: 3rem;
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

const StyledDetailLi = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledDetailPosition = styled.div`
  display: flex;
  background-color: #ffffff;

  :first-child {
  }
  p {
    padding-right: 1rem;
    width: 14rem;
  }
`;

const StyledBody = styled.div`
  border-top: 0.1rem solid lightgray;
  min-height: 30rem;
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
    filter: drop-shadow(0 0 0.2rem green);

    :first-child {
      margin-right: 1rem;
      background-color: white;
      color: #787878;
      filter: drop-shadow(0 0 0.2rem grey);
    }
  }
`;
