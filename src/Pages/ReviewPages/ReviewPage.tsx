import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import HeaderCategory from '../../Components/Commons/HeaderCategory';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import ReviewDetailPage from './ReviewDetailPage';
import WriteReviewPage from './WriteReviewPage';
import Avatar1 from '../../styles/icon/avatar1.png';
import Avatar2 from '../../styles/icon/avatar2.png';
import Avatar3 from '../../styles/icon/avatar3.png';
import Avatar4 from '../../styles/icon/avatar4.png';
import Magnifier from '../../styles/icon/magnifier.png';

const AVATARS = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar3];

const REVIEW_LIST_DUMMY_DATA = [
  {
    userIcon: '최도원',
    reviewTitle: '이번 매치 OOO 매니저님 너무 친절하셨어요! 또 뵙고 싶네요~',
    reviewContent:
      '우아ㅗ아ㅗ아왕롼ㅇ뢈ㅇ라양야야야얌나야냥냐얀랸얄ㄴ야ㅑㄹㅇ냐 뀨뀨ㅜㄴㅁ우ㅏㄴㅇㅁㄴㅇ먄럄뉾ㄴㄹㄴ뮮ㄴㄹㄴ뮮뉴ㅠㄻ뉴 ㅠㅁㄴ라윰닒ㄴ율ㄴㅇㄻㅁㅁㅇㄹㅇㄴㄹㄴㅇㄹ',
    author: '최도원',
    area: '수원',
    stadium: '수원 HM파크',
    like: 7,
  },
  {
    userIcon: '안동현',
    reviewTitle: '오우 쉣! 여기 너무 별로야!',
    author: '안동현',
    area: '서울',
    stadium: '수원 HM파크',
    like: 77,
  },
  {
    userIcon: '최도원',
    reviewTitle: '매니저님 체고~ 나도 체고~',
    author: '김승섭',
    area: '수원',
    stadium: '수원 HM파크',
    like: 20,
  },
  {
    userIcon: '최도원',
    reviewTitle: '안양 왕감자, 권성경이올시다',
    author: '권성경',
    area: '안양',
    stadium: '수원 HM파크',
    like: 20,
  },
  {
    userIcon: '최도원',
    reviewTitle: '경기도 광주 OO매니저님 체고~',
    author: '신성민',
    area: '서울',
    stadium: '수원 HM파크',
    like: 777,
  },
];

export default function ReviewPage() {
  const [reviewList, setReviewList] = useState(REVIEW_LIST_DUMMY_DATA);
  const [filteredReviewList, setFilteredReviewList] = useState(
    REVIEW_LIST_DUMMY_DATA
  );
  const [searchInput, setSearchInput] = useState('');
  const [clicked, setClicked] = useState(Array(reviewList.length).fill(false));
  const navigate = useNavigate();

  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function handleSearch(input: string) {
    setSearchInput(input);
    const foundReviewList = reviewList.filter((v) =>
      v.reviewTitle.includes(input)
    );
    setFilteredReviewList(foundReviewList);
  }

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleReviewTitleClick(index: number) {
    navigate(`/review/detail/${index}`, { state: reviewList[index] });
  }

  function handleLikeButtonClick(index: number) {
    setReviewList((prevList) => {
      const updatedList = [...prevList];
      const updatedItem = { ...updatedList[index] };
      if (clicked[index]) updatedItem.like -= 1;
      else updatedItem.like += 1;
      updatedList[index] = updatedItem;

      const updatedClicked = [...clicked];
      updatedClicked[index] = !clicked[index];
      setClicked(updatedClicked);

      return updatedList;
    });
  }

  function handleWriteButtonClick() {
    navigate('/review/write');
  }

  return (
    <>
      <Header />
      <HeaderCategory />
      <Routes>
        <Route path="/write" element={<WriteReviewPage />} />
        <Route path="/detail/:index" element={<ReviewDetailPage />} />
        <Route
          path="/"
          element={
            <StyledBody>
              <StyledCarousel>
                <StyledImage>
                  <Slider {...settings}>
                    <StyledImage>
                      <img src="Images/reviewMainImg.png" alt="reviewMainImg" />
                    </StyledImage>
                    <StyledImage>
                      <img src="Images/footy.png" alt="footy" />
                    </StyledImage>
                    <StyledImage>
                      <img src="Images/reviewImg3.jpg" alt="reviewImg3" />
                    </StyledImage>
                    <StyledImage>
                      <img src="Images/reviewImg4.jpg" alt="reviewImg4" />
                    </StyledImage>
                  </Slider>
                </StyledImage>
              </StyledCarousel>
              <StyledList>
                <StyledReviewHeader>
                  <div className="filter">
                    <span>지역</span>
                    <span>구장</span>
                  </div>
                  <div className="search">
                    <img src={Magnifier} alt="magnifier" />
                    <input
                      className="search-input"
                      value={searchInput}
                      onChange={(e) => {
                        handleSearch(e.target.value);
                      }}
                      placeholder="검색어를 입력해주세요."
                    />
                  </div>
                </StyledReviewHeader>
                <StyledListTitle>
                  <p>🥅 리뷰 리스트</p>
                </StyledListTitle>
                <StyledReviewListHeader>
                  <span></span>
                  <span></span>
                  <span>작성자</span>
                  <span>지역</span>
                  <span>구장</span>
                  <span>좋아요</span>
                </StyledReviewListHeader>
                {searchInput.length === 0
                  ? reviewList.map((item, index) => (
                      <StyledReviewList key={index}>
                        <span className="review-user-icon">
                          {<img src={AVATARS[index]} alt="userIcon" />}
                        </span>
                        <span
                          className="review-title"
                          onClick={() => handleReviewTitleClick(index)}
                        >
                          {item.reviewTitle}
                        </span>
                        <span className="review-author">{item.author}</span>
                        <span className="review-area">{item.area}</span>
                        <span className="review-stadium">{item.stadium}</span>
                        <span className="review-like-count">
                          {
                            <button
                              className={`review-like-button ${
                                clicked[index] ? 'heart-beat' : ''
                              }`}
                              onClick={() => handleLikeButtonClick(index)}
                            >
                              {clicked[index] ? '🧡' : '🤍'}
                            </button>
                          }
                          {item.like}
                        </span>
                      </StyledReviewList>
                    ))
                  : filteredReviewList.map((item, index) => (
                      <StyledReviewList key={index}>
                        <span className="review-user-icon">
                          {<img src={AVATARS[index]} alt="avatar1" />}
                        </span>
                        <span
                          className="review-title"
                          onClick={() => handleReviewTitleClick(index)}
                        >
                          {item.reviewTitle}
                        </span>
                        <span className="review-author">{item.author}</span>
                        <span className="review-area">{item.area}</span>
                        <span className="review-stadium">{item.stadium}</span>
                        <span className="review-like-count">
                          {
                            <button
                              className={`review-like-button ${
                                clicked[index] ? 'heart-beat' : ''
                              }`}
                              onClick={() => handleLikeButtonClick(index)}
                            >
                              {clicked[index] ? '🧡' : '🤍'}
                            </button>
                          }
                          {item.like}
                        </span>
                      </StyledReviewList>
                    ))}
              </StyledList>
              <StyledStickyButtons>
                <StyledWrite>
                  <button
                    onClick={() => {
                      handleWriteButtonClick();
                    }}
                  >
                    글쓰기
                  </button>
                </StyledWrite>
                <StyledScrollToBottomButton>
                  <button onClick={handleScrollToTop}>⬆</button>
                </StyledScrollToBottomButton>
              </StyledStickyButtons>
            </StyledBody>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 98.4rem;
  margin: 0 auto; /* 좌우 여백 자동 조정 */
`;

const StyledCarousel = styled.div`
  background-color: white;
  height: 35vh;
  overflow: hidden;
`;

const StyledImage = styled.div`
  width: 100%;
  height: 30vh;
`;

const StyledList = styled.div``;

const StyledReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;

  .filter > span {
    font-size: 1.5rem;
    font-weight: 700;
    color: #a8a8a8;
    padding: 1rem 2.5rem;
    margin: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 2rem;
    box-shadow: 2px 2px #e0e0e0;
  }

  .search {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .search-input {
    font-size: 1.65rem;
    padding: 1rem;
    margin-left: 1rem;
    border: 1px solid #bebebe;
    border-radius: 5rem;
    box-shadow: 2px 2px #cccccc;
  }
`;

const StyledListTitle = styled.div`
  padding: 3rem 0 2rem 0;
  > p {
    font-size: 2.5rem;
    font-weight: bold;
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const StyledReviewListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1.5fr 1fr;
  place-items: center;
  grid-gap: 1rem;
  > span {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const StyledReviewList = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1.5fr 1fr;
  grid-gap: 1rem;
  place-items: center;
  > span {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border: 1px solid #ededed;
    border-radius: 5rem;
  }

  .review-user-icon {
    padding: 1rem;
  }

  .review-title {
    width: 100%;
    padding: 2.5rem 3.5rem;
    margin: 3rem 0;
    border: 2px solid #ededed;
    border-radius: 3rem;
    background-color: #fafafa;
    z-index: 1;

    &:hover {
      cursor: pointer;
      background-color: #cccccc;
    }
  }

  .review-author {
    background-color: #e2f5fc;
  }
  .review-area {
    background-color: #fce9fc;
  }
  .review-stadium {
    background-color: #eaffea;
  }
  .review-like-button {
    background-color: #ffdcdc;
  }

  .heart-beat {
    animation: heartBeat 0.5s linear;
  }

  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .review-like-count {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffdcdc;
  }
`;

const StyledStickyButtons = styled.div`
  display: grid;
  grid-template-columns: 50fr 1fr;
  place-items: center;
  position: sticky;
  bottom: 5rem;
  margin: 3rem 0 5rem 5rem;
`;

const StyledWrite = styled.span`
  > button {
    padding: 1.5rem 2rem;
    border: 1px solid #ededed;
    border-radius: 3rem;
    background-color: white;
    box-shadow: 1px 1px #ededed;
    box-shadow: 2px 2px #ededed;
    &:hover {
      font-size: 2.2rem;
      font-weight: bold;
      color: black;
    }
  }
`;

const StyledScrollToBottomButton = styled.span`
  opacity: 0.5;
  > button {
    border: 1px solid #ededed;
    border-radius: 18rem;
    &:hover {
      opacity: 1;
      font-size: 2.5rem;
      color: black;
    }
  }
`;
