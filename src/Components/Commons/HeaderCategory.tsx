import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

interface CategoryTextProps {
  focused: boolean;
}

export default function HeaderCategory() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isGroundPage = location.pathname === '/ground';
  const isReviewPage = location.pathname === '/review';
  const isTeampage = location.pathname === '/teampage';

  return (
    <StyledHeaderCategory>
      <StyledCategoryText
        focused={isHome}
        onClick={() => {
          navigate('/');
        }}
      >
        홈
      </StyledCategoryText>

      <StyledCategoryText
        focused={isGroundPage}
        onClick={() => {
          navigate('/ground');
        }}
      >
        경기장
      </StyledCategoryText>

      <StyledCategoryText
        focused={isReviewPage}
        onClick={() => {
          navigate('/review');
        }}
      >
        리뷰
      </StyledCategoryText>

      <StyledCategoryText
        focused={isTeampage}
        onClick={() => {
          navigate('/teampage');
        }}
      >
        팀
      </StyledCategoryText>
    </StyledHeaderCategory>
  );
}

const StyledHeaderCategory = styled.div`
  width: 98.4rem;
  padding: 3rem 2rem;
  height: 3rem;
  margin: 1rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledCategoryText = styled.span<CategoryTextProps>`
  padding-right: 3rem;
  font-size: ${({ focused }) => (focused ? '2.0rem' : '1.9rem')};
  color: ${({ focused }) => (focused ? 'black' : '#727f88')};
  font-weight: ${({ focused }) => (focused ? 'bold' : 'normal')};
  cursor: pointer;
`;
