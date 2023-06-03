import React from 'react';
import styled from 'styled-components';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Routes, Route, Link } from 'react-router-dom';
import FindPage from './FindPage';
import SubmitPage from './SubmitPage';
import DetailPage from './DetailPage';
import EditPage from './EditPage';
import HeaderCategory from '../../Components/Commons/HeaderCategory';
function TeamPage() {
  // const [data, setData] = React.useState<any[]>([]); // axios 할 때 사용할 수 있으므로 남겨둔다.
  const [findingTeam, setFindingTeam] = React.useState<boolean>(true);
  const [findingMember, setFindingMember] = React.useState<boolean>(true);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <>
      <Header />
      <HeaderCategory />
      <div
        style={{
          height: '100rem',
        }}
      >
        <Teampage>
          <TeamPageHeader>
            <TeamPageOption>
              <button
                onClick={() => {
                  setFindingTeam(true);
                  setFindingMember(true);
                }}
              >
                모두 보기
              </button>
              <button
                onClick={() => {
                  setFindingMember(true);
                  setFindingTeam(false);
                }}
              >
                팀원 구해요
              </button>
              <button
                onClick={() => {
                  setFindingMember(false);
                  setFindingTeam(true);
                }}
              >
                팀 구해요
              </button>
            </TeamPageOption>
            <button
              style={{
                display: 'flex',
                marginLeft: 'auto',
                height: 'fit-content',
                alignItems: 'center',
                marginTop: 10,
                marginRight: 7,
              }}
            >
              글 작성하기
            </button>
          </TeamPageHeader>
        </Teampage>
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route
            path="/"
            element={
              <FindPage
                findingTeam={findingTeam}
                findingMember={findingMember}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default TeamPage;

const Teampage = styled.div`
  display: flex;
  justify-content: center;
`;
const TeamPageHeader = styled.div`
  display: flex;
  width: 70%;
  background-color: yellowgreen;
`;
const TeamPageOption = styled.div`
  display: flex;
  margin: 10px 10px;
`;
