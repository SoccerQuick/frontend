import React from 'react';
import styled from 'styled-components';
import AdminLeftBar from '../Components/AdminPage/AdminLeftBar';
import AdminBody from '../Components/AdminPage/AdminBody';

function AdminPage() {
  return (
    <AdminContainer>
      <HeaderContainer>
        <div>여긴 헤더임</div>
      </HeaderContainer>
      <BodyContainer>
        <BodyLeftBar>
          <AdminLeftBar />
        </BodyLeftBar>
        <BodyMain>
          <AdminBody />
        </BodyMain>
      </BodyContainer>
      <FooterContainer>
        <div>여긴 푸터임 ㅎ</div>
      </FooterContainer>
    </AdminContainer>
  );
}

export default AdminPage;

const AdminContainer = styled.div`
  //   display: flex;
  //   justify-content: center;
  font-size: 3rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  //   position: fixed;
  width: 100%;
  height: 3em;
  top: 0;
  background-color: beige;
`;
const BodyContainer = styled.div`
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
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

const FooterContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 6rem;
  bottom: 0;
  background-color: grey;
`;
