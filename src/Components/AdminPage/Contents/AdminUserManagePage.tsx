import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { fileURLToPath } from 'url';

// type props = {
//   showModal: boolean;
//   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
//   modalData: any[];
//   setModalData: React.Dispatch<React.SetStateAction<any[]>>;
// };

function AdminUserManager() {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);

  // 검색조건을 선택하는 부분
  const [searchOption, setSearchOption] = React.useState<string | null>(null);

  // 검색어를 설정하는 부분
  const [inputValue, setInputValue] = React.useState<string>('');
  const handleInputChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  // 새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/change`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  function filter(e: any) {
    e.preventDefault();
    const newData = data.filter((item) => {
      if (searchOption === null) {
        if (
          item['role'].includes(inputValue) ||
          item['name'].includes(inputValue) ||
          item['email'].includes(inputValue)
        ) {
          return true;
        }
      } else if (item[searchOption].includes(inputValue)) {
        return true;
      }
      return false;
    });
    setFilteredData(newData);
  }

  return (
    <>
      <UserManageContainer>
        <button
          onClick={() => {
            console.log(filteredData);
          }}
        >
          ㅁㄴㅇㄹ
        </button>
        <SelectCategory
          options={FilterlingOptions.status}
          defaultValue={FilterlingOptions.status[0]}
          styles={SelectStyles}
          onChange={(option: any) => {
            if (option.label === '닉네임') {
              setSearchOption('userName');
            } else if (option.label === 'e-mail') {
              setSearchOption('userEmail');
            } else if (option.label === '권한') {
              setSearchOption('role');
            } else {
              setSearchOption(null);
            }
          }}
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
          <caption>유저 관리</caption>
          <thead>
            <tr>
              <th>Number</th>
              <th>닉네임</th>
              <th>E-mail</th>
              <th>권한</th>
              <th>상세정보</th>
              <th>정보수정</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0
              ? filteredData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setModalData(item);
                        }}
                      >
                        조회
                      </button>
                    </td>
                    <td>
                      <button>정보수정</button>
                    </td>
                  </tr>
                ))
              : data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setModalData(item);
                        }}
                      >
                        조회
                      </button>
                    </td>
                    <td>
                      <button>정보수정</button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </UserManageContainerTable>
    </>
  );
}

export default AdminUserManager;

const UserManageContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;
const UserManageContainerTable = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  width: 70%;
  table {
    width: 100%;
  }

  tr {
    // display: flex;
    justify-content: space-between;
    align-items: center;
  }
  td {
    // display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

// Select 라이브러리를 사용하여 만든 드롭다운 박스의 스타일 지정
const SelectCategory = styled(Select)`
  width: 16rem;
  font-size: 2rem;
`;
// Select 라이브러리에서 사용할 세부 스타일 속성
const SelectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid #ccc',
    height: '5.5rem',
    borderRadius: '4px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#38D411' : 'white',
    color: state.isSelected ? 'white' : 'black',
    ':hover': {
      backgroundColor: state.isSelected ? '#38D411' : '#96DF84',
    },
  }),
};

const FilterlingOptions = {
  status: [
    { value: 'option0', label: '통합검색' },
    { value: 'option1', label: '닉네임' },
    { value: 'option2', label: 'e-mail' },
    { value: 'option3', label: '권한' },
  ],
};

const UserData = [
  {
    userId: 'admin',
    password: '$2b$10$W2zlQImZpwqidTkPrSmloeLAeYziEUM4ANT47m41.I6r2Aaqf6dwa',
    userName: '고구마',
    userEmail: 'goguma@gamza.com',
    role: 'admin',
    favoritePlaygrounds: [],
    isBanned: false,
    banEndDate: null,
    createdAt: {
      $date: '2023-05-27T12:04:28.314Z',
    },
    updatedAt: {
      $date: '2023-05-27T12:04:28.314Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '6471f2b249afe8edd996ae37',
    },
    userId: 'goguma',
    password: '$2b$10$J7W.i/E8OG3JpJLKYCTh2u1KW0RnQoRCmictMRAuOqTvPxxMW7qAC',
    userName: '고구마유저11',
    userEmail: 'goguma@goguma11',
    role: 'user',
    favoritePlaygrounds: [],
    isBanned: true,
    banEndDate: {
      $date: '2023-06-01T11:53:50.936Z',
    },
    createdAt: {
      $date: '2023-05-27T12:08:18.091Z',
    },
    updatedAt: {
      $date: '2023-05-30T11:53:50.938Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '647264e9585f29edb8c2a25f',
    },
    userId: 'goguma1',
    password: '$2b$10$GgidQdHUL1hgL7n6B3dAKuU4y2jFKbi8XG4YrfZ3/2uyqh2BIjUt6',
    userName: '고구마유저113',
    userEmail: 'goguma@goguma113',
    role: 'manager',
    favoritePlaygrounds: [],
    isBanned: false,
    banEndDate: null,
    createdAt: {
      $date: '2023-05-27T20:15:37.556Z',
    },
    updatedAt: {
      $date: '2023-05-29T11:54:44.176Z',
    },
    __v: 0,
  },
];
