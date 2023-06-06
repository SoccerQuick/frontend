import React from 'react';
import styled from 'styled-components';
import DropDown from '../../Commons/DropDown';
import FILTERING_OPTIONS from '../../Commons/FilteringOptions';
import { setPriority } from 'os';

type props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DetailModal(props: props) {
  const { setShowModal } = props;
  const [author, setAuthor] = React.useState('');
  const [area, setArea] = React.useState('');
  const [post, setPost] = React.useState('');
  const [memo, setMemo] = React.useState('');

  function SubmitButton() {
    // 이곳에 axios 요청을 달아야 할 것임.
    const data = {
      author: author,
      area: area,
      post: post,
      memo: memo,
    };
    console.log(data);
    return data;
  }

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
              <div
                style={{
                  fontSize: '2rem',
                }}
              >
                <StyledSpan>작성자</StyledSpan>
                <StyledInput
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
              </div>
            </StyledHeader>
            <StyledSubTitle>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <StyledBlock>
                  <DropDown
                    list={FILTERING_OPTIONS.findingTeam.area}
                    selected={area}
                    setSelected={setArea}
                  />
                </StyledBlock>
                <StyledBlock>
                  <StyledSpan style={{ width: '11rem', paddingRight: '1rem' }}>
                    모집글 주소 :
                  </StyledSpan>
                  <StyledInput
                    style={{ width: '29.7rem' }}
                    onChange={(e) => {
                      setPost(e.target.value);
                    }}
                  />
                </StyledBlock>
              </div>
              <StyledBlock>
                <StyledSpan>메모</StyledSpan>
                <StyledInput
                  style={{ width: '53rem' }}
                  onChange={(e) => {
                    setMemo(e.target.value);
                  }}
                />
              </StyledBlock>
            </StyledSubTitle>
          </DetailPage>
          <StyledButtonContainer>
            <StyledButton onClick={SubmitButton}>제출</StyledButton>
            <StyledButton
              onClick={() => {
                setShowModal(false);
              }}
            >
              취소
            </StyledButton>
          </StyledButtonContainer>
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
  height: 35rem;
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
    justify-content: space-between;
    align-items: center;
  }
  td {
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
  width: 90%;
  border-bottom: 1px solid #dddddd;
`;

const StyledSubTitle = styled.div`
  z-index: 901;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 11.5rem;
`;

const StyledBlock = styled.div`
  z-index: 901;
  display: block;
  /* background-color: skyblue; */
  /* border: 1px solid #dddddd; */
  border-radius: 2rem;
  margin: 0.7rem;
  padding: 1rem 1rem;
`;

const StyledInput = styled.input`
  z-index: 901;
  width: 8rem;
`;

const StyledSpan = styled.span`
  z-index: 901;
  display: inline-block;
  text-align: center;
  margin-top: 0.4rem;
  width: 6rem;
`;

const StyledButtonContainer = styled.div`
  z-index: 899;
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  position: absolute;
  top: 0;
  margin-left: 44rem;
  margin-top: 28rem;
  width: 90%;
  border-radius: 1rem;
`;

const StyledButton = styled.button`
  z-index: 900;
  margin: 0rem 1.5rem;
  height: 4rem;
  padding: 0rem 2rem;
  border-radius: 2rem;
`;
