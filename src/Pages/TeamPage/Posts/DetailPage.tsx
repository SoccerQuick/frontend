import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import HtmlParser from '../../../Components/Commons/HtmlParser';
import SubmitForFindingMember from '../../../Components/TeamPage/SubmitModal/SubmitForFindingMember';
import SubmitForFindingTeam from '../../../Components/TeamPage/SubmitModal/SubmitForFindingTeam';
import TeamPageComments from '../../../Components/TeamPage/Comments/TeamPageComments';
import axios from 'axios';

type DetailList = {
  title: string;
  value: string;
};

type Applicant = {
  id: string;
  position: string;
  level: string;
  contents: string;
};

type DataProps = {
  group_id?: string;
  location: string;
  // leader_name?: string;
  author: string;
  body: string;
  gender: string;
  position?: string;
  skill?: string;
  status: string;
  title: string;
  gk_count?: number;
  gk_current_count?: number;
  player_count?: number;
  player_current_count?: number;
  random_matched?: string;
  applicant?: Applicant[];
  [key: string]: string | number | undefined | Applicant[];
};

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
};

type DetailListProps = {
  detailList: DetailList[];
};

function DetailPage(props: DetailListProps) {
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const {
    detailList,
    // data
  } = props;
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const [data, setData] = React.useState<any>(initialData); // <<<<<<<<<<< any 타입 정의를 해야되는데 좀 어려움
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/group/${url}`)
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
        .delete(`${process.env.REACT_APP_API_URL}/group/${url}`, config)
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
    <>
      <StyledContainer style={{ marginTop: '3rem' }}>
        <StyledBox
          style={{
            width: '100rem',
          }}
        >
          <StyledTitle>제 목</StyledTitle>
          <StyledDivText style={{ textAlign: 'left', width: '47rem' }}>
            {data.title}
          </StyledDivText>
          <StyledTitle style={{ marginLeft: '30rem' }}>작성자</StyledTitle>
          <StyledDiv style={{ width: '9rem' }}>{data.author}</StyledDiv>
        </StyledBox>
        <StyledBox style={{ justifyContent: 'space-around', width: '100rem' }}>
          {detailList.map((item: DetailList) => (
            <StyledDiv key={item.title}>
              <StyledTitle>{item.title}</StyledTitle>
              <StyledDivText>{data[item.value]}</StyledDivText>
            </StyledDiv>
          ))}
        </StyledBox>
      </StyledContainer>
      <StyledContainer>
        <StyledBox
          style={{ display: 'grid', border: '1px solid', borderRadius: '1rem' }}
        >
          <HtmlParser data={data.contents} />
        </StyledBox>
      </StyledContainer>
      <div
        style={{
          display: 'flex',
          height: '3rem',
          // backgroundColor: 'beige',
          justifyContent: 'flex-end',
        }}
      >
        <div>
          <Link to={`/teampage/edit/${url}`} state={data}>
            <StyledMiniButton>수정</StyledMiniButton>
          </Link>
          <StyledMiniButton onClick={deletePostHandler}>삭제</StyledMiniButton>
        </div>
      </div>
      <StyledContainer>
        <StyledBox style={{ width: '100rem' }}>
          <StyledDiv
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {data.applicant?.length > 0 && (
              <TeamPageComments data={data.applicant} />
            )}
          </StyledDiv>
        </StyledBox>
      </StyledContainer>
      <StyledContainer>
        <StyledBox style={{ justifyContent: 'center' }}>
          <StyledButton
            onClick={() => {
              setShowModal(true);
            }}
          >
            {data.leader_name ? '👪함께하기' : '✏️댓글 달기'}
          </StyledButton>

          <StyledButton
            onClick={() => {
              navigate(`/teampage/team`);
            }}
          >
            ↩️돌아가기
          </StyledButton>
        </StyledBox>
        {showModal &&
          (data.leader_name ? (
            <SubmitForFindingMember
              setShowModal={setShowModal}
              groupId={data.group_id}
            />
          ) : (
            <SubmitForFindingTeam setShowModal={setShowModal} />
          ))}
      </StyledContainer>
    </>
  );
}

export default DetailPage;

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 10px 0px;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
`;
const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  margin: 0rem 2rem;
  font-size: 1.9rem;
  padding: 1rem 1rem;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

const StyledDivText = styled.div`
  display: flex;
  padding-left: 1rem;
  width: fit-content;
  height: 4rem;
  text-align: center;
  align-items: center;
  font-size: 2rem;
`;

const StyledButton = styled.button`
  background-color: white;
  margin: 6rem 3rem 2rem 3rem;
  &:hover {
    color: gray;
    text-decoration: underline;
    transform: scale(1.1);
  }
`;

const StyledMiniButton = styled.button`
  font-size: 1.7rem;
  margin: 1rem 1rem 0rem 0.4rem;
  background-color: white;
  &:hover {
    color: gray;
    text-decoration: underline;
    transform: scale(1.1);
  }
`;
