import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import FilteringOptions from '../../../Components/Commons/FilteringOptions';
import DropDown from '../../../Components/Commons/DropDown';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import SubmitFindingTeam from '../../../Components/TeamPage/PostPage/FindingTeam';
import SubmitFindingMembers from '../../../Components/TeamPage/PostPage/FindingMembers';
import axios from 'axios';

function SubmitPage() {
  const [boardCategory, setBoardCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [area, setArea] = React.useState('');
  const [player, setPlayer] = React.useState(0);
  const [playerNeed, setPlayerNeed] = React.useState(0);
  const [gk, setGk] = React.useState(0);
  const [gkNeed, setGkNeed] = React.useState(0);
  const [position, setPosition] = React.useState('포지션');
  const [skill, setSkill] = React.useState('실력수준');
  const [gender, setGender] = React.useState('성별');

  // quill 라이브러리를 세팅하는 부분
  const [content, setContent] = React.useState('');
  const handleEditorChange: (value: string) => void = (value) => {
    setContent(value);
  };
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const navigate = useNavigate();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  // 새 글을 작성하는 axios 명령
  const handlePostRequest = () => {
    let data;
    if (boardCategory === '팀원 구해요') {
      data = {
        category: boardCategory,
        // leader_id: '6480bae19854c0d4bc9b4cde', //현재 수동입력, 접속 유저 데이터에서 가져오게 해야함
        // leader_name: '고마오', //현재 수동입력, 접속 유저 데이터에서 가져오게 해야함
        title: title,
        location: area,
        play_date: '아무때나',
        player_current_count: player,
        player_count: playerNeed,
        gk_current_count: gk,
        gk_count: gkNeed,
        contents: content,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/group`, data, config)
        .then((res) => {
          console.log('POST 요청 성공 : ', res.data);
          alert('팀원 모집글이 등록되었습니다.');
          navigate('/teampage/team');
        })
        .catch((e) => {
          console.error('POST 요청 실패 : ', e);
        });
    } else if (boardCategory === '팀 구해요') {
      data = {
        category: boardCategory,
        title: title,
        gender: gender,
        skill: skill,
        position: position,
        contents: content,
      };
      console.log('자기어필 페이지는 아직 미구현');
    }

    // 정상 출력되는지 테스트용 콘솔
    console.log(data);
  };

  // 입력값을 검사하는 validator - 오류를 조금 더 상세하게 출력하는 것이 효과가 있을까?
  function submitValidator() {
    if (boardCategory === '카테고리') {
      throw new Error('카테고리를 선택해주세요');
    } else if (boardCategory === '팀원 구해요') {
      if (playerNeed <= 0 || gkNeed <= 0) {
        throw new Error('입력값을 확인해주세요');
      }
    } else if (boardCategory === '팀 구해요') {
      if (position === '포지션' || skill === '실력수준' || gender === '성별') {
        throw new Error('입력값을 확인해주세요');
      }
    }
    return '통과';
  }

  // quill 라이브러리 상단바에 사용할 모듈을 정하는 부분
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        // ['link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ],
    },
  };

  return (
    <>
      <StyledContainer
        style={{
          marginTop: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledBox
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DropDown
            list={FilteringOptions.submit.category}
            selected={boardCategory}
            setSelected={setBoardCategory}
            style={{ width: '20rem', height: '5rem', fontSize: '1.9rem' }}
          />
          <StyledTitle>활동지역</StyledTitle>
          <StyledInputText
            onChange={(e) => {
              setArea(e.target.value);
            }}
          />
          <StyledTitle>제목</StyledTitle>
          <StyledInputText
            style={{ textAlign: 'left', width: '32rem' }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/* <StyledTitle style={{ marginLeft: '4rem' }}>작성자</StyledTitle>
          <StyledDiv style={{ border: '1px solid #eee' }}></StyledDiv> */}
        </StyledBox>
        {/* 여기에 작성한 후에 Teampage에 컴포넌트로 분리하고 사용. Select의 조건에 따라 불러올 예정 */}
      </StyledContainer>
      {/* 선택된 카테고리에 따라 노출시킬 버튼 목록이 다르다. */}
      <StyledContainer>
        {boardCategory === '팀원 구해요' && (
          <SubmitFindingMembers
            // allowRandom={allowRandom}
            player={player}
            setPlayer={setPlayer}
            gk={gk}
            setGk={setGk}
            // setAllowRandom={setAllowRandom}
            playerNeed={playerNeed}
            setPlayerNeed={setPlayerNeed}
            gkNeed={gkNeed}
            setGkNeed={setGkNeed}
          />
        )}
        {/* {boardCategory === '팀 구해요' && (
          <SubmitFindingTeam
            gender={gender}
            skill={skill}
            position={position}
            setGender={setGender}
            setSkill={setSkill}
            setPosition={setPosition}
          />
        )} */}
      </StyledContainer>
      <StyledContainer>
        <StyledBox style={{ display: 'grid' }}>
          <ReactQuill
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            style={{ width: '100rem', height: '45rem' }}
          />
        </StyledBox>
        <StyledBox style={{ justifyContent: 'center' }}>
          <StyledButton
            onClick={() => {
              try {
                const validationResult = submitValidator();
                if (validationResult === '통과') {
                  handlePostRequest();
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            작성하기
          </StyledButton>
          <StyledButton
            onClick={() => {
              navigate(-1);
            }}
          >
            취소하기
          </StyledButton>
        </StyledBox>
      </StyledContainer>
    </>
  );
}

export default SubmitPage;

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 40px 0px;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  /* background-color: beige; */
  /* width: 100rem; */
  /* background-color: beige; */
`;

const StyledBox = styled.div`
  display: flex;
  margin-top: 0rem;
`;
const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 2rem;
  font-size: 1.9rem;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

const StyledInputText = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 9rem;
  height: 4rem;
  text-align: center;
  align-items: center;
`;

const StyledInputNumber = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 6rem;
  height: 4rem;
  text-align: center;
`;

const StyledButton = styled.button`
  margin: 6rem 3rem 0rem 3rem;
`;
