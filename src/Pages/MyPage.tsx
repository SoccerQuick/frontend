import react, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import MyPageBar from '../Components/MyPage/MyPageBar';
import MyProfile from '../Components/MyPage/MyPageProfile';
import { MyPageInfo } from '../Components/MyPage/MyPageInfo';
import MyPageCheckPassword from '../Components/MyPage/MyPageCheckPassword';
import { userSelector } from '../store/selectors/authSelectors';
import { useSelector } from 'react-redux';

export type FormData = {
  user_id: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
  gender: string;
};

export function MyPage() {
  const [formData, setFormData] = useState<FormData>({
    user_id: '',
    name: '',
    nick_name: '',
    email: '',
    phone_number: '',
    gender: '',
  });

  const [checkedBarItem, setCheckedBarItem] = useState(1);
  const [checkMyPassword, setCheckPassword] = useState(false);
  const [password, setPassword] = useState('');
  const user = useSelector(userSelector);

  useEffect(() => {
    setTimeout(() => {
      getUserData();
    }, 5000);
  }, []);

  const getUserData = () => {
    const header = {
      withCredentials: true,
    };

    axios
      .get(`http://localhost:8800/user/`, header)
      .then((res) => res.data.userData)
      .then((user) => {
        console.log(user);
        setFormData((prev) => ({
          ...prev,
          user_id: user.user_id,
          name: user.name,
          nick_name: user.nick_name,
          email: user.email,
          phone_number: user.phone_number,
          gender: user.gender,
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <MyPageBar
        checkedBarItem={checkedBarItem}
        setCheckedBarItem={setCheckedBarItem}
      />
      {checkedBarItem === 1 ? (
        <MyPageContainer>
          {checkMyPassword ? (
            <>
              <MyProfile formData={formData} />
              <MyPageInfo
                oldPassword={password}
                formData={formData}
                setFormData={setFormData}
              />
            </>
          ) : (
            <MyPageCheckPassword
              password={password}
              setPassword={setPassword}
              setCheckPassword={setCheckPassword}
            />
          )}
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
  height: 80rem;
  padding: 0 2rem;
  margin: 2rem auto;
  background-color: rgb(247, 247, 247);
`;
