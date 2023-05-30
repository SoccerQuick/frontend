import React from 'react';
import styled from 'styled-components';
import AdminTeamManager from '../Contents/AdminTeamManagePage';
import AdminUserManager from '../Contents/AdminUserManagePage';
import AdminMain from '../Contents/AdminMainPage';

type props = {
  mainButton: boolean;
  setMainButton: React.Dispatch<React.SetStateAction<boolean>>;
  userButton: boolean;
  setUserButton: React.Dispatch<React.SetStateAction<boolean>>;
  teamButton: boolean;
  setTeamButton: React.Dispatch<React.SetStateAction<boolean>>;
};

function AdminBody(props: props) {
  return (
    <>
      <BodyContainer>
        {props.mainButton && <AdminMain />}
        {props.userButton && <AdminUserManager />}
        {props.teamButton && <AdminTeamManager />}
      </BodyContainer>
    </>
  );
}

export default AdminBody;

const BodyContainer = styled.div`
  background-color: skyblue;
  padding: 2rem 2rem;
  height: 100%;
`;
