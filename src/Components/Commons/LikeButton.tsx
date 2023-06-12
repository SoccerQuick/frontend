import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    // post로 likesCount 전송
    setIsClicked(!isClicked);
  }

  return (
    <>
      <StyledLikeBtn onClick={handleOnClick}>
        {isClicked ? '🧡' : '🤍'}
        {likesCount}
      </StyledLikeBtn>
    </>
  );
}

const StyledLikeBtn = styled.button`
  background-color: transparent;
`;
