import React from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import AdminMainPage from '../../Components/AdminPage/Contents/AdminMainPage';
import AdminUserManager from '../../Components/AdminPage/Contents/AdminUserManagePage';
import { Routes, Route, Link } from 'react-router-dom';

function AdminPage() {
  const [mainButton, setMainButton] = React.useState(true);
  const [userButton, setUserButton] = React.useState(false);
  return (
    <>
      <Header />
      <AdminContainer>
        <BodyContainer>
          <BodyLeftBar>
            <Link to="/admin">
              <MainButton
                style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}
                onClick={() => {
                  setMainButton(true);
                  setUserButton(false);
                }}
                state={mainButton ? 'true' : 'false'}
              >
                🔒관리자 메인
              </MainButton>
            </Link>
            <Link to="/admin/user">
              <UserButton
                style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}
                onClick={() => {
                  setMainButton(false);
                  setUserButton(true);
                }}
                state={userButton ? 'true' : 'false'}
              >
                🔨유저 관리
              </UserButton>
            </Link>
          </BodyLeftBar>
          <BodyMain>
            <Routes>
              <Route path="/user" element={<AdminUserManager />} />
              <Route path="/" element={<AdminMainPage />} />
            </Routes>
          </BodyMain>
        </BodyContainer>
      </AdminContainer>
      <Footer />
    </>
  );
}

export default AdminPage;

const AdminContainer = styled.div`
  font-size: 3rem;
`;

const BodyContainer = styled.div`
  background-color: skyblue;
  height: fit-content;
`;

const BodyLeftBar = styled.div`
  display: flex;
  float: left;
  width: 10%;
  height: 80rem;
  flex-direction: column;
  align-items: center;
  background-color: yellowgreen;
`;

const BodyMain = styled.div`
  background-color: rgb(245, 245, 245);
  height: 80rem;
`;

const MainButton = styled.button<{ state: string }>`
  border: 1px solid;

  ${(props) =>
    props.state === 'true' &&
    `
    background-color: lightgray;
  `}
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: darkgray;
  }
`;

const UserButton = styled.button<{ state: string }>`
  border: 1px solid;
  ${(props) =>
    props.state === 'true' &&
    `
    background-color: lightgray;
  `}
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: darkgray;
  }
`;
