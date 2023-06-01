import React from 'react';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchData from '../Components/SearchPage/Contents/SearchData';
import SearchModal from '../Components/SearchPage/Layout/SearchModal';

function SearchPage() {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          height: '25rem',
          width: '100%',
          backgroundColor: 'beige',
        }}
      >
        지도 띄울 부분
      </div>
      <div
        style={{
          display: 'grid',
          gridAutoRows: 'min-content',
          height: '100rem',
        }}
      >
        <div>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            모달띄워줘
          </button>
        </div>
        <SearchData
          showModal={showModal}
          setShowModal={setShowModal}
          modalData={modalData}
          setModalData={setModalData}
        />
        {showModal && (
          <SearchModal
            showModal={showModal}
            setShowModal={setShowModal}
            modalData={modalData}
            setModalData={setModalData}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;

const SearchPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SearchPageHeader = styled.div`
  display: flex;
  width: 70%;
  background-color: yellowgreen;
`;
const SearchPageOption = styled.div`
  display: flex;
  margin: 10px 10px;
`;
