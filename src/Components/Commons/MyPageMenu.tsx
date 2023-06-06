import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import react, { useState } from 'react';

type MyPageBarProps = {
  handleLoginModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMyPageMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export function MyPageMenu({
  handleMyPageMenu,
  handleLoginModal,
}: MyPageBarProps) {
  const navigate = useNavigate();
  return (
    <StyledMenu onMouseLeave={handleMyPageMenu}>
      <StyledMenuProfile>
        <StyledImgWrapper>
          <StyledProfileImg src={'/logo192.png'} alt="profile" />
        </StyledImgWrapper>
        <StyledProfileInfo>
          <div>길동이님</div>
          <div>aaa</div>
        </StyledProfileInfo>
      </StyledMenuProfile>{' '}
      <StyledMenuItem
        onClick={() => {
          navigate('/mypage');
        }}
      >
        마이 페이지
      </StyledMenuItem>
      <StyledMenuItem onClick={handleLoginModal}>로그아웃</StyledMenuItem>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 2.5rem;
  width: 14rem;
  height: 20rem;
  top: 21px;
  left: -50px;
  z-index: 1000;
`;

const StyledMenuProfile = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: rgb(247 247 247);
`;

const StyledProfileImg = styled.img`
  min-width: 3.5rem;
  max-height: 3.5rem;
  border-radius: 100%;
  background-color: white;
`;

const StyledProfileInfo = styled.div`
  margin-left: 1rem;
`;

const StyledMenuItem = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding-top: 5px;
  color: rgb(62, 84, 99);
  font-size: 10px;
  border-top: 1px solid #e5e5e5;
  &:first-child {
    margin-top: 15px;
  }
`;
