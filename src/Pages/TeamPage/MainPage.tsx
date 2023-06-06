import React from 'react';
import styled from 'styled-components';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Routes, Route } from 'react-router-dom';
import FindPage from './Views/SelectCategory';
import FindingMember from './Views/FindingMember';
import FindingTeam from './Views/FindingTeam';
import FindingTeamDetail from './Views/FindingTeamDetail';
import FindingMemberDetail from './Views/FindingMemberDetail';
import PreView from '../../Components/TeamPage/PreView/PreViewModal';
import SubmitPage from './Posts/PostPage';
import EditPage from './Posts/EditPage';
import HeaderCategory from '../../Components/Commons/HeaderCategory';
function TeamPage() {
  const [findingTeam, setFindingTeam] = React.useState<boolean>(true);
  const [findingMember, setFindingMember] = React.useState<boolean>(true);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);

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
          <div>
            {showModal && (
              <PreView setShowModal={setShowModal} modalData={modalData} />
            )}
          </div>
          <TeamPageBody>
            <Routes>
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/edit/:id" element={<EditPage />} />
              <Route
                path="/player"
                element={
                  <FindingTeam
                    setShowModal={setShowModal}
                    setModalData={setModalData}
                  />
                }
              />
              <Route path="/player/:id" element={<FindingTeamDetail />} />
              <Route
                path="/team"
                element={
                  <FindingMember
                    setShowModal={setShowModal}
                    setModalData={setModalData}
                  />
                }
              />
              <Route path="/team/:id" element={<FindingMemberDetail />} />
              <Route
                path="/"
                element={
                  <FindPage
                    findingTeam={findingTeam}
                    findingMember={findingMember}
                    setFindingTeam={setFindingTeam}
                    setFindingMember={setFindingMember}
                  />
                }
              />
            </Routes>
          </TeamPageBody>
        </Teampage>
      </div>
      <Footer />
    </>
  );
}

export default TeamPage;

const Teampage = styled.div`
  display: grid;
  justify-content: center;
`;

const TeamPageBody = styled.div`
  height: 80rem;
  justify-content: center;
`;
