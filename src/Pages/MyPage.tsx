import react, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyPageBar from '../Components/MyPage/MyPageBar';
import MyProfile from '../Components/MyPage/MyPageProfile';
import MyPageInfo from '../Components/MyPage/MyPageInfo';

export type FormData = {
  user_id: string;
  name: string;
  nickname: string;
  email: string;
  phonenumber: string;
  gender?: string;
};

export function MyPage() {
  const [formData, setFormData] = useState<FormData>({
    user_id: '',
    name: '',
    nickname: '',
    email: '',
    phonenumber: '',
    gender: '',
  });

  const [checkedBarItem, setCheckedBarItem] = useState(1);

  useEffect(() => {
    axios
      .get('http://localhost:8800/user/aaa', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data.userData)
      .then((user) => {
        setFormData((prev) => ({
          ...prev,
          user_id: user.user_id,
          name: user.name,
          nickname: user.nick_name,
          email: user.email,
          phonenumber: user.phone_number,
          gender: user.gender,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <MyPageBar
        checkedBarItem={checkedBarItem}
        setCheckedBarItem={setCheckedBarItem}
      />
      {checkedBarItem === 1 ? (
        <MyPageContainer>
          <MyProfile formData={formData} />
          <MyPageInfo formData={formData} setFormData={setFormData} />
        </MyPageContainer>
      ) : (
        ''
      )}
      {checkedBarItem === 2 ? (
        <MyPageContainer>내글 검색 페이지</MyPageContainer>
      ) : (
        ''
      )}
      {checkedBarItem === 3 ? (
        <MyPageContainer>즐겨찾는 구장 페이지</MyPageContainer>
      ) : (
        ''
      )}

      <Footer />
    </>
  );
}

const MyPageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 98.4rem;
  height: 50rem;
  padding: 0 2rem;
  margin: 2rem auto;
  background-color: rgb(247, 247, 247);
`;
