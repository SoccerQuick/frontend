import React from 'react';
import styled from 'styled-components';

export default function Main() {
  return (
    <MainContainer>
      <h1>Main Page</h1>
      <HeaderContainer>Header</HeaderContainer>
      <BodyContainer>
        <BodyUpperContainer>
          <BodyImage
            src="https://media.istockphoto.com/id/1219371111/ko/%EC%82%AC%EC%A7%84/%EC%86%90%EC%A0%84%EB%93%B1-%EC%8A%B9%EB%A6%AC-%EA%B3%A8-%EB%84%93%EC%9D%80-%EA%B0%81%EB%8F%84%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%B5%EC%9D%84-%EB%B0%9C%EB%A1%9C-%EA%B2%BD%EA%B8%B0%EC%9E%A5%EC%97%90%EC%84%9C-%ED%96%89%EB%8F%99%EC%97%90-%EC%B6%95%EA%B5%AC-%EB%98%90%EB%8A%94-%EC%B6%95%EA%B5%AC-%EC%84%A0%EC%88%98-%EC%95%A1%EC%85%98-%EC%9A%B4%EB%8F%99-%EA%B2%BD%EC%9F%81.jpg?s=1024x1024&w=is&k=20&c=-fn9c-jeiDsf7Kx-kNodP_rkWz20lweZ3m0iIQnsJMo="
            alt="footyImg"
          />
          <SearchContainer>
            <SearchContainerText>
              가까운 매치를 찾아보세요 !
            </SearchContainerText>
            <SearchFormContainer>
              <SearchFormInput placeholder="🔎 어디에서 공 찰래?" />
              <SearchFormButton>매치 찾기</SearchFormButton>
            </SearchFormContainer>
          </SearchContainer>
        </BodyUpperContainer>
        <BodyLowerContainer>abc</BodyLowerContainer>
      </BodyContainer>
      <FooterContainer>Footer</FooterContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background-color: yellow;
`;

const HeaderContainer = styled.div`
  background-color: blue;
  margin: 1rem;
`;

const BodyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  background-color: green;
  margin: 1rem;
`;

const BodyUpperContainer = styled.div`
  flex: 1;
  background-color: orange;
  position: relative;
`;

const BodyImage = styled.img`
  width: auto;
  margin: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #e3eee1;
  border-radius: 1rem;
  opacity: 0.8;
  padding: 2rem;

  position: absolute;
  top: 80%;
  left: 40%;
  transform: translate(-50%, -50%); /* 상하좌우 중앙 정렬 */
  overflow: hidden; /* 텍스트가 컨테이너를 벗어나지 않도록 함 */

  /* 반응형 스타일 설정 */
  width: 55%;
  height: 25%;

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 1200px) {
    width: 65%;
  }

  @media (min-width: 1600px) {
    width: 75%;
  }
`;

const SearchContainerText = styled.div`
  font-weight: bold;

  /* 반응형 스타일 설정 */
  @media (min-width: 320px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1200px) {
    width: 70%;
    font-size: 3.5rem;
  }
`;

const SearchFormContainer = styled.form`
  display: flex;
  justify-content: space-between;
`;

const SearchFormInput = styled.input`
  width: 70%;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #ffffff;
  font-size: 1rem;

  /* 반응형 스타일 설정 */
  @media (min-width: 320px) {
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1200px) {
    width: 70%;
    font-size: 2.5rem;
  }
`;

const SearchFormButton = styled.button`
  width: 20%;
  background-color: #00980f;
  opacity: 1 !important;
  border-radius: 1rem;
  color: white;
  white-space: nowrap; /* 임시로 텍스트를 한 줄로 강제로 출력 */

  /* 반응형 스타일 설정 */
  @media (min-width: 320px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1200px) {
    font-size: 2.5rem;
  }
`;

const BodyLowerContainer = styled.div`
  flex: 2;
  background-color: pink;
`;

const FooterContainer = styled.div`
  background-color: red;
`;
