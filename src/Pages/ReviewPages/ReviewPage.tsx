import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
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
import sliderImg1 from '../../styles/icon/review_slider1.png';
import sliderImg2 from '../../styles/icon/review_slider2.png';
import sliderImg3 from '../../styles/icon/review_slider3.png';
import Magnifier from '../../styles/icon/magnifier.png';

const AVATARS = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar3];

const config = {
  withCredentials: true,
};

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

const filterList: { [key: string]: string[] } = {
  지역: ['구장'],
  서울: ['구장', '서울 HM파크', '수원 HM파크'],
  수원: ['구장', '수원 HM파크', '수원 HM파크'],
  안양: ['구장', '안양 HM파크', '수원 HM파크'],
  광주: ['구장', '광주 HM파크', '수원 HM파크'],
  부산: ['구장', '부산 HM파크', '수원 HM파크'],
};

const areaList = Object.keys(filterList);
const stadiumList = Object.values(filterList);

export default function ReviewPage() {
  const [reviewList, setReviewList] = useState(REVIEW_LIST_DUMMY_DATA);
  const [filteredReviewList, setFilteredReviewList] = useState(
    REVIEW_LIST_DUMMY_DATA
  );
  const [searchedReviewList, setSearchedReviewList] = useState(
    REVIEW_LIST_DUMMY_DATA
  );
  const [filteredReviewListBySearch, setFilteredReviewListBySearch] = useState(
    REVIEW_LIST_DUMMY_DATA
  );
  const [findReview, setFindReview] = useState({
    area: '',
    stadium: '',
  });
  const [areaFilterView, setAreaFilterView] = useState(false);
  const [stadiumFilterView, setStadiumFilterView] = useState(false);
  const [area, setArea] = useState('지역');
  const [stadium, setStadium] = useState('구장');
  const [searchInput, setSearchInput] = useState('');
  const [clicked, setClicked] = useState(Array(reviewList.length).fill(false));
  const [reviewId, setReviewId] = useState<string>('');

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

  useEffect(() => {
    const filter = {
      area: area === '지역' ? '' : area,
      stadium: stadium === '구장' ? '' : stadium,
    };
    setFindReview(filter);
  }, [area, stadium]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reviews`, config)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          res.data.data.map((v: any) =>
            axios
              .get(
                `${process.env.REACT_APP_API_URL}/reviews/${v.review_id}`,
                config
              )
              .then((res: any) => {
                console.log(res);
              })
          );
        }
      });
  });

  useEffect(() => {
    const foundReviewList = reviewList.filter((v) => {
      if (area !== '지역' && stadium !== '구장') {
        return v.area === findReview.area && v.stadium === findReview.stadium;
      }
      if (area !== '지역' && stadium === '구장') {
        return v.area === findReview.area;
      }
      if (area === '지역' && stadium === '구장') {
        return true;
      }
    });
    setFilteredReviewList(foundReviewList);
  }, [findReview]);

  function handleSearch(input: string) {
    setSearchInput(input);
    setFilteredReviewListBySearch(
      filteredReviewList.filter(
        (v) => v.area.includes(input) || v.stadium.includes(input)
      )
    );
  }

  function handleOutsideClick() {
    setAreaFilterView(false);
    setStadiumFilterView(false);
  }

  function handleReviewTitleClick(index: number) {
    navigate(`/review/detail/${index}`, { state: reviewList[index] });
  }

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div onClick={handleOutsideClick}>
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
                      <img src={sliderImg2} alt="reviewMainImg" />
                    </StyledImage>
                    <StyledImage>
                      <img src={sliderImg3} alt="footy" />
                    </StyledImage>
                    <StyledImage>
                      <img src={sliderImg1} alt="reviewImg3" />
                    </StyledImage>
                  </Slider>
                </StyledImage>
              </StyledCarousel>
              <StyledList>
                <StyledReviewHeader>
                  <div className="filter">
                    <ul
                      className="areaFilter"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p
                        className="area"
                        onClick={() => {
                          if (stadiumFilterView) {
                            setStadiumFilterView(false);
                            setAreaFilterView(!areaFilterView);
                          } else {
                            setAreaFilterView(!areaFilterView);
                          }
                        }}
                      >
                        {area}
                      </p>
                      {areaFilterView &&
                        areaList.map((item, index) => (
                          <li
                            className="area-list"
                            key={index}
                            onClick={() => {
                              setArea(item);
                              setAreaFilterView(false);
                            }}
                          >
                            {item}
                          </li>
                        ))}
                    </ul>

                    <ul
                      className="stadiumFilter"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p
                        className="stadium"
                        onClick={() => {
                          if (areaFilterView) {
                            setAreaFilterView(false);
                            setStadiumFilterView(!stadiumFilterView);
                          } else {
                            setStadiumFilterView(!stadiumFilterView);
                          }
                        }}
                      >
                        {stadium}
                      </p>
                      {stadiumFilterView &&
                        filterList[area].map((item, index) => (
                          <li
                            className="stadium-list"
                            key={index}
                            onClick={() => {
                              area === '지역'
                                ? setStadium('구장')
                                : setStadium(item);
                              setStadiumFilterView(false);
                            }}
                          >
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="search">
                    <img src={Magnifier} alt="magnifier" />
                    <input
                      className="search-input"
                      value={searchInput}
                      onChange={(e) => {
                        handleSearch(e.target.value);
                      }}
                      placeholder="지역 혹은 구장으로 검색"
                    />
                  </div>
                </StyledReviewHeader>
                <StyledListTitle>
                  <p>🥅 리뷰 리스트</p>
                </StyledListTitle>
                <StyledReviewListHeader>
                  <span>순번</span>
                  <span>리뷰</span>
                  <span>작성자</span>
                  <span>지역</span>
                  <span>구장</span>
                  <span>좋아요</span>
                </StyledReviewListHeader>
                {searchInput.length === 0
                  ? filteredReviewList.map((item, index) => (
                      <StyledReviewList key={index}>
                        <span className="review-user-icon">{index + 1}</span>
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
                          🧡 {item.like}
                        </span>
                      </StyledReviewList>
                    ))
                  : filteredReviewListBySearch.map((item, index) => (
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
                          🧡 {item.like}
                        </span>
                      </StyledReviewList>
                    ))}
              </StyledList>
              <StyledStickyButtons>
                <StyledScrollToBottomButton>
                  <button onClick={handleScrollToTop}>⬆</button>
                </StyledScrollToBottomButton>
              </StyledStickyButtons>
            </StyledBody>
          }
        />
      </Routes>
      <Footer />
    </div>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem 0;
  position: relative;

  .filter {
    display: flex;
    flex-direction: row;
    position: relative;
    font-size: 1.8rem;
    font-weight: 500;
    z-index: 2;

    .areaFilter {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      border: 1px solid #e0e0e0;
      border-radius: 2rem;
      box-shadow: 2px 2px #e0e0e0;
      background-color: white;
      left: 0;
      overflow: hidden;
    }

    .area {
      padding: 1rem 2.5rem;
      &:hover {
        background-color: #e0e0e0;
      }
    }

    .stadiumFilter {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      border: 1px solid #e0e0e0;
      border-radius: 2rem;
      box-shadow: 2px 2px #e0e0e0;
      background-color: white;
      left: 0;
      overflow: hidden;
      left: 10rem;
    }

    .stadium {
      padding: 1rem 2.5rem;
      &:hover {
        background-color: #e0e0e0;
      }
    }
  }

  .area-list {
    width: 100%;
    padding: 1rem 0;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  .stadium-list {
    width: 100%;
    padding: 1rem 0;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  .search {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .search-input {
    width: 65%;
    font-size: 1.8rem;
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
    font-weight: bold;
    padding: 1rem;
    border: none;
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

  .review-like-count {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffdcdc;
  }
`;

const StyledStickyButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  grid-template-columns: 50fr 1fr;
  place-items: center;
  position: sticky;
  bottom: 5rem;
  margin: 3rem 0 5rem 5rem;
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
