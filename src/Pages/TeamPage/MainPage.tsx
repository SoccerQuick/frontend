import React from 'react';
import styled from 'styled-components';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Routes, Route } from 'react-router-dom';
import FindPage from './Views/SelectCategory';
import FindingMember from './Views/FindingMember/FindingMember';
import FindingMemberDetail from './Views/FindingMember/FindingMemberDetail';
import SubmitPage from './Posts/PostPage';
import EditPage from './Posts/EditPage';
import HeaderCategory from '../../Components/Commons/HeaderCategory';
function TeamPage() {
  const [findingTeam, setFindingTeam] = React.useState<boolean>(true);
  const [findingMember, setFindingMember] = React.useState<boolean>(true);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <>
      <Header />
      <HeaderCategory />
      <TeamPageBody>
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route
            path="/team"
            element={<FindingMember setShowModal={setShowModal} />}
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
      <Footer />
    </>
  );
}

export default TeamPage;

const TeamPageBody = styled.div`
  width: 98.5rem;
  min-height: 55rem;
  margin: 0 auto 15rem auto;
`;
