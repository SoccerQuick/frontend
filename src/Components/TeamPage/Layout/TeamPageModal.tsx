import React from 'react';
import styled from 'styled-components';
import FindingTeamDetail from '../Contents/FindingTeamDetail';
import FindingMemberDetail from '../Contents/FindingMemberDetail';

type props = {
  searchMode: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: any;
  setModalData: React.Dispatch<React.SetStateAction<any>>;
};

function DetailModal(props: props) {
  const modalData = props.modalData;
  const setShowModal = props.setShowModal;
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
              setShowModal(false);
            }}
          >
            X
          </button>
          <DetailPage>
            <StyledHeader>
              <div>{modalData.title}</div>
              <div
                style={{
                  fontSize: '1.7rem',
                }}
              >
                <span
                  style={{ border: '1px solid #DDDDDD', marginRight: '0.4rem' }}
                >
                  작성자
                </span>
                <span>{modalData.author}</span>
              </div>
            </StyledHeader>
            <StyledSubTitle>
              <StyledBlock>{modalData.area}</StyledBlock>
              <StyledBlock>{modalData.status}</StyledBlock>
            </StyledSubTitle>
            {modalData.position ? (
              <FindingTeamDetail modalData={modalData} />
            ) : (
              <FindingMemberDetail modalData={modalData} />
            )}
          </DetailPage>
        </ModalPage>
      </Modal>
    </>
  );
}

export default DetailModal;

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
  z-index: 500;
`;

const ModalPage = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70rem;
  height: 70rem;
  background-color: rgba(255, 255, 255);
  z-index: 501;
`;

const DetailPage = styled.div`
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: beige;
  width: 90%;
  font-size: 2.3rem;
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

const StyledHeader = styled.div`
  z-index: 901;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  margin-top: 4rem;
  padding-bottom: 1rem;
  // background-color: skyblue;
  width: 90%;
  border-bottom: 1px solid #dddddd;
`;

const StyledSubTitle = styled.div`
  z-index: 901;
  display: flex;
  // align-items: center;
  // justify-content: space-between;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 9.5rem;
`;

const StyledBlock = styled.div`
  z-index: 901;
  display: block;
  background-color: skyblue;
  border: 1px solid #dddddd;
  border-radius: 2rem;
  margin: 0.7rem;
  padding: 0.4rem 1rem;
`;
