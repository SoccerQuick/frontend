import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchData from '../Components/SearchPage/Contents/SearchData';
import SearchModal from '../Components/SearchPage/Layout/SearchModal';
import HeaderCategory from '../Components/Commons/HeaderCategory';

function SearchPage() {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);

  return (
    <>
      <Header />
      <HeaderCategory />
      <div style={{ justifyContent: 'center' }}>
        <div
          style={{
            height: '25rem',
            width: '98.4rem',
            backgroundColor: 'beige',
            margin: 'auto',
          }}
        >
          지도 띄울 부분
        </div>
        <div
          style={{
            height: '100rem',
            width: '98.4rem',
            margin: 'auto',
          }}
        >
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
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;
