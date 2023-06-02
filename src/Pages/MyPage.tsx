import react from 'react';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyPageBar from '../Components/MyPage/MyPageBar';
import MyPageInfo from '../Components/MyPage/MyPageInfo';

function MyPage() {
  return (
    <>
      <Header />
      <MyPageBar />
      <MyPageContainer>
        <MyPageInfo />
      </MyPageContainer>
      <Footer />
    </>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  width: 98.4rem;
  height: auto;
  padding: 0 2rem;
  margin: 2rem auto;
`;
