import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
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
  _id?: string;
};

type DataType = {
  applicant?: Applicant[];
  group_id?: string;
  num: number;
  title: string;
  author: string;
  location: string;
  status: string;
  position?: string;
  skill?: string;
  gk_need?: number;
  gk?: number;
  player_need?: number;
  player?: number;
  gender: string;
  contents: string;
  [key: string]: string | number | undefined | Applicant[];
};

type DetailListProps = {
  detailList: DetailList[];
  data: any;
};

function DetailPage(props: DetailListProps) {
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const { detailList, data } = props;
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const additionalData = { data };

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
        {/* 댓글창 / 신청자목록을 불러오는 부분 */}
        <StyledBox>
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
            {data.applicant && <TeamPageComments data={data.applicant} />}
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
            {data.leader_name ? '함께하기' : '댓글 달기'}
          </StyledButton>

          <Link to={`/teampage/edit/:id`} state={additionalData}>
            <StyledButton>수정하기</StyledButton>
          </Link>
          <StyledButton
            onClick={() => {
              navigate(-1);
            }}
          >
            돌아가기
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
  /* background-color: beige; */
  /* width: 100rem; */
  /* background-color: beige; */
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
  /* border: 1px solid #eee; */
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

// const StyledInputText = styled.input`
//   display: flex;
//   padding-left: 1rem;
//   width: 9rem;
//   height: 4rem;
//   text-align: center;
//   align-items: center;
// `;

const StyledDivText = styled.div`
  display: flex;
  padding-left: 1rem;
  /* background-color: skyblue; */
  /* width: 9rem; */
  width: fit-content;
  height: 4rem;
  text-align: center;
  align-items: center;
  font-size: 2rem;
`;

// const StyledInputNumber = styled.input`
//   display: flex;
//   padding-left: 1rem;
//   width: 6rem;
//   height: 4rem;
//   text-align: center;
// `;

const StyledButton = styled.button`
  margin: 6rem 3rem 0rem 3rem;
`;

const Styledcontents = styled.div`
  padding: 2rem 2rem;
  width: 100rem;
  height: 45rem;
  background-color: beige;
  font-size: 3rem;
`;

const StyledComment = styled.div`
  /* display: grid; */
  margin: 0.4rem 0.4rem;
  align-items: center;
  font-size: 2rem;
`;
