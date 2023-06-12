import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Avatar from '../../styles/icon/avatar1.png';
import LikeButton from '../Commons/LikeButton';
import {
  isLogInSelector,
  userSelector,
} from '../../store/selectors/authSelectors';

interface DomId {
  dom_id: string;
}

interface CommentData {
  name?: string;
  comment: string;
  userslikes: string[];
}

const config = {
  withCredentials: true,
};

export default function Review(props: DomId) {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [comment, setComment] = useState<string>('');
  const [editComment, setEditComment] = useState<string>('');
  const [isCommentEditable, setIsCommentEditable] = useState<boolean>(false);
  const isLogin = useSelector(isLogInSelector);
  const userData = useSelector(userSelector);
  const userId = userData?.user_id;
  const userName = userData?.name;
  console.log(commentData);

  // url 주소 수정 필요
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/reviews`).then((res) => {
      setCommentData(res.data.data);
      console.log('useEffect');
    });
  }, [props.dom_id]);

  function submitWriteComment() {
    if (!isLogin) {
      return alert('로그인이 필요한 서비스입니다.');
    }
    //401에러(Unauthorized)
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/reviews`,
        {
          user_id: userId,
          dom_id: props.dom_id,
          contents: comment,
        },
        config
      )
      .then((res) => {
        console.log(res);
        setComment('');
        setCommentData((prevData: CommentData[]) => [
          ...prevData,
          {
            name: userId,
            comment,
            userslikes: [],
          },
        ]);
      });
  }

  function handleEditComment(index: number, comment: string) {
    if (isCommentEditable) {
      const newCommentData = [...commentData];
      newCommentData[index].comment = editComment;
      setCommentData(newCommentData);
    }
    setIsCommentEditable((prev) => !prev);
  }

  function handleDeleteComment(index: number) {
    const newCommentData = [...commentData];
    newCommentData.splice(index, 1);
    setCommentData(newCommentData);
  }

  return (
    <StyledCommentContainer>
      <h2>📄 리뷰 목록</h2>
      {commentData.map((item, index) => (
        <StyledComments key={index}>
          <div className="review-header">
            <span className="user-info">
              <span>
                <img className="user-icon" src={Avatar} alt="avatar" />
              </span>
              <span className="user-name">{item.name}</span>
            </span>
            <span className="likes">
              <LikeButton userslikes={item.userslikes} />
            </span>
          </div>
          <div className="review-content">
            {isCommentEditable ? (
              <input
                value={item.comment}
                onChange={(e) => {
                  setEditComment(e.target.value);
                }}
              />
            ) : (
              <span className="comment">{item.comment}</span>
            )}
          </div>
          {isLogin && item.name === userName && (
            <div className="review-content-buttons">
              <button
                className="review-edit"
                onClick={() => {
                  handleEditComment(index, comment);
                }}
              >
                {isCommentEditable ? '완료' : '수정'}
              </button>
              <button
                className="review-delete"
                onClick={() => handleDeleteComment(index)}
              >
                삭제
              </button>
            </div>
          )}
        </StyledComments>
      ))}
      <StyledWriteComment>
        <textarea
          placeholder="리뷰 내용을 입력하세요"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <div>
          <button className="add-img-btn">이미지 첨부</button>
          <button className="comment-btn" onClick={submitWriteComment}>
            작성 완료
          </button>
        </div>
      </StyledWriteComment>
    </StyledCommentContainer>
  );
}

const StyledCommentContainer = styled.div`
  display: flex;
  flex-direction: column;

  > h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0.6rem 0;
  }
`;

const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 2rem 0;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;

  .review-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .user-info {
    margin-bottom: 1rem;
  }

  .user-icon {
    width: 3rem;
    height: auto;
  }

  .review-content {
    display: flex;
    flex-direction: row;
    padding-left: 1rem;
    margin-bottom: 1rem;
  }

  .review-content-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .review-edit {
    margin-right: 1rem;
    font-size: 1rem;
  }

  .review-delete {
    font-size: 1rem;
  }
`;

const StyledWriteComment = styled.div`
  display: flex;
  flex-direction: column;
  height: 25rem;
  padding: 2rem;
  margin-top: 2rem;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;

  > textarea {
    width: 100%;
    height: 100%;
    border: none;
  }

  > div {
    margin-top: 2rem;
    align-self: flex-end;

    .add-img-btn {
      margin-right: 1rem;
    }
  }
`;
