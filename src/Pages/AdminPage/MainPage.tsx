import React from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import AdminMainPage from '../../Components/AdminPage/Contents/AdminMainPage';
import AdminUserManager from '../../Components/AdminPage/Contents/AdminUserManagePage';
import { Routes, Route, Link } from 'react-router-dom';

function AdminPage() {
  return (
    <>
      <Header />
      <AdminContainer>
        <BodyContainer>
          <BodyLeftBar>
            <Link to="/admin">
              <button
                style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}
              >
                관리자 메인
              </button>
            </Link>
            <Link to="/admin/user">
              <button
                style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}
              >
                유저 관리
              </button>
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
