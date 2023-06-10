import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserDetailModal from '../Layout/UserDetailModal';
import DropDown from '../../Commons/DropDown';
import FilterlingOptions from '../../Commons/FilteringOptions';

interface UserData {
  admin_id?: string;
  user_id: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
  role: string;
  gender: string;
  createdAt: string;
  login_banned: boolean;
  login_banEndDate: string | null;
}

function AdminUserManager() {
  const [showDetailModal, setShowDetailModal] = React.useState<boolean>(false);
  const [showManagementModal, setShowManagementModal] =
    React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<UserData>({
    admin_id: '',
    user_id: '',
    name: '',
    nick_name: '',
    email: '',
    phone_number: '',
    role: '',
    gender: '',
    createdAt: '',
    login_banned: false,
    login_banEndDate: null,
  });
  const [option, setOption] = React.useState('통합검색');

  // 검색어를 설정하는 부분
  const [inputValue, setInputValue] = React.useState<string>('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 헤더 및 쿠키 설정 부분
  const config = {
    withCredentials: true,
  };
  // 새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<UserData[]>([]);
  React.useEffect(() => {
    // const cookies = document.cookie;
    // console.log(cookies);
    axios
      .get(`${process.env.REACT_APP_API_URL}/admins`, config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  const [filteredData, setFilteredData] = React.useState<UserData[]>([]);
  function filter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newData = data.filter((item) => {
      // 통합검색
      if (option === '통합검색') {
        if (
          item.role.includes(inputValue) ||
          item.name.includes(inputValue) ||
          item.nick_name.includes(inputValue) ||
          item.email.includes(inputValue)
        ) {
          return true;
        }
      } else if (option === '닉네임') {
        if (item.nick_name.includes(inputValue)) {
          return true;
        }
      } else if (option === '이름') {
        if (item.name.includes(inputValue)) {
          return true;
        }
      } else if (option === 'e-mail') {
        if (item.email.includes(inputValue)) {
          return true;
        }
      } else if (option === '권한') {
        if (item.role.includes(inputValue)) {
          return true;
        }
      }
      return false;
    });
    setFilteredData(newData);
  }

  return (
    <>
      <UserManageContainer>
        <DropDown
          list={FilterlingOptions.adminUserPage.status}
          selected={option}
          setSelected={setOption}
          style={{ width: '16rem' }}
        />
        <form onSubmit={filter}>
          <input
            style={{ height: '5rem' }}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button style={{ height: '5rem', width: '7rem' }} type="submit">
            검색
          </button>
        </form>
      </UserManageContainer>
      <UserManageContainerTable>
        <table>
          {/* <caption>유저 관리</caption> */}
          <thead>
            <StyledTr>
              <th style={{ width: '5%' }}>순번</th>
              <th style={{ width: '7%' }}>권한</th>
              <th style={{ width: '7%' }}>이름</th>
              <th style={{ width: '8%' }}>닉네임</th>
              <th style={{ width: '10%' }}>E-mail</th>
              <th style={{ width: '7%' }}>상태</th>
              <th style={{ width: '10%' }}>정지기간</th>
              <th style={{ width: '10%' }}>가입일자</th>
              <th style={{ width: '5%' }}>회원관리</th>
            </StyledTr>
          </thead>
          <tbody>
            {(inputValue === '' && filteredData.length === 0
              ? data
              : filteredData
            ).map((item, idx) => (
              <StyledTr key={idx}>
                <td style={{ width: '5%' }}>{idx + 1}</td>
                <td style={{ width: '7%' }}>
                  {item.role === 'admin'
                    ? '👑총 관리자'
                    : item.role === 'manager'
                    ? '🌟관리자'
                    : '일반회원'}
                </td>
                <td style={{ width: '7%' }}>{item.name}</td>
                <td style={{ width: '8%' }}>{item.nick_name}</td>
                <td style={{ width: '10%' }}>{item.email}</td>
                <td style={{ width: '7%' }}>
                  {item.login_banned ? '로그인 정지' : '정상'}
                </td>
                <td style={{ width: '10%' }}>
                  {item.login_banned
                    ? item.login_banEndDate?.split('T')[0].slice(2)
                    : '-'}
                </td>
                <td style={{ width: '5%' }}>
                  {item.createdAt.split('T')[0].slice(2)}
                </td>
                <td style={{ width: '5%' }}>
                  <StyledButton
                    onClick={() => {
                      setShowDetailModal(true);
                      setModalData(item);
                      console.log(item);
                    }}
                  >
                    🔍
                  </StyledButton>
                </td>
              </StyledTr>
            ))}
          </tbody>
        </table>
      </UserManageContainerTable>
      {showDetailModal && (
        <UserDetailModal
          setShowDetailModal={setShowDetailModal}
          showManagementModal={showManagementModal}
          setShowManagementModal={setShowManagementModal}
          modalData={modalData}
        />
      )}
    </>
  );
}

export default AdminUserManager;

const UserManageContainer = styled.div`
  padding-top: 2rem;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;
const UserManageContainerTable = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-left: 3rem;
  width: 70%;
  font-size: 2rem;
  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    // display: flex;
    border-bottom: 1px solid #000;
    justify-content: space-between;
    align-items: center;
  }
  td {
    // display: flex;
    /* border-bottom: 1px solid #000; */
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const StyledTr = styled.tr`
  height: 4rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
`;

const StyledButton = styled.button`
  font-size: 1.4rem;
  border-radius: 1rem;
`;
