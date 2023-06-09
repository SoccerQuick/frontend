import React from 'react';
import styled from 'styled-components';

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

type props = {
  showManagementModal: boolean;
  setShowManagementModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: UserData;
};

function DetailModal(props: props) {
  const { showManagementModal, setShowDetailModal, setShowManagementModal } =
    props;

  // 출력할 데이터를 포맷팅하는 변수
  const detailList = {
    이름: props.modalData.name,
    닉네임: props.modalData.nick_name,
    성별: props.modalData.gender,
    전화번호: props.modalData.phone_number,
    'E-mail': props.modalData.email,
    역할:
      props.modalData.role === 'admin'
        ? '👑총 관리자'
        : props.modalData.role === 'manager'
        ? '🌟관리자'
        : '일반회원',
    '계정 상태': props.modalData.login_banned ? 'Banned' : '정상',
    '정지 기간': props.modalData.login_banned
      ? props.modalData.login_banEndDate?.split('T').join(' ')
      : '-',
    가입일자: props.modalData.createdAt.split('T')[0].slice(2),
  };

  return (
    <>
      <Modal>
        <ModalPage>
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => {
              setShowDetailModal(false);
            }}
          >
            X
          </button>
          <TeamPageBody>
            <table>
              <caption
                style={{ fontSize: '2rem', margin: '1rem 0rem 2.3rem 0rem' }}
              >
                🔎유저 상세정보
              </caption>
              <thead></thead>
              <tbody>
                {Object.entries(detailList).map(([key, value]) => (
                  <tr key={key}>
                    <td style={{ width: '10rem' }}>{key}</td>
                    <td style={{ width: '75%' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TeamPageBody>

          {!showManagementModal && (
            <DetailButtonContainer>
              <DetailButton
                data={showManagementModal ? 'false' : 'true'}
                onClick={() => {
                  alert('API미제공');
                }}
              >
                정보수정
              </DetailButton>
              <DetailButton
                data={showManagementModal ? 'false' : 'true'}
                onClick={() => {
                  setShowManagementModal(true);
                }}
              >
                권한변경
              </DetailButton>
            </DetailButtonContainer>
          )}

          {showManagementModal && (
            <ManagementButtonContainer>
              <ManagementButton data={showManagementModal ? 'true' : 'false'}>
                관리자 임명
              </ManagementButton>
              <ManagementButton data={showManagementModal ? 'true' : 'false'}>
                로그인 정지
              </ManagementButton>
              <ReturnButton
                style={{ zIndex: 999 }}
                onClick={() => {
                  setShowManagementModal(false);
                }}
              >
                X
              </ReturnButton>
            </ManagementButtonContainer>
          )}
        </ModalPage>
      </Modal>
    </>
  );
}

export default DetailModal;

const TeamPageBody = styled.div`
  /* display: flex; */
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  font-size: 1.8rem;
  table {
    width: 100%;
  }

  tr {
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  td {
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid;
    padding: 0.4rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const ModalPage = styled.div`
  position: fixed;
  margin: 2rem;
  padding: 1.2rem 1.3rem 0rem 6rem;
  justify-content: center;
  align-items: center;
  width: 60rem;
  height: 45rem;
  background-color: rgba(255, 255, 255);
  z-index: 999;
`;

const DetailButtonContainer = styled.div`
  display: flex;
  position: absolute;
  width: 47.6rem;
  justify-content: center;
  z-index: 997;
  /* background-color: beige; */
`;

const DetailButton = styled.button<{ data: string }>`
  margin: 1rem 2rem;
  padding: 0.4rem 2rem;
  border-radius: 1rem;
`;

const ManagementButtonContainer = styled.div`
  display: flex;
  position: absolute;
  width: 47.6rem;
  justify-content: center;
  z-index: 997;
`;

const ManagementButton = styled.button<{ data: string }>`
  margin: 1rem 2rem;
  padding: 0.4rem 2rem;
  border-radius: 1rem;
`;

const ReturnButton = styled.button`
  margin: 1rem 2rem;
  padding: 0rem 1.4rem;
`;
