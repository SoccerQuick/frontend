import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface LikeButtonProps {
  userslikes: string[];
}

export default function LikeButton(props: LikeButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [likesCount, setLikesCount] = useState(props.userslikes.length);

  function handleOnClick() {
    if (isClicked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsClicked(!isClicked);
  }

  return (
    <>
      <StyledLikeBtn onClick={handleOnClick} isClicked={isClicked}>
        {isClicked ? '🧡' : '🤍'}
        {likesCount}
      </StyledLikeBtn>
    </>
  );
}

const StyledLikeBtn = styled.button<{ isClicked: boolean }>`
  background-color: transparent;

  ${(props) =>
    props.isClicked &&
    css`
      animation: scaleAnimation 0.5s linear;
    `}

  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
