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
      <div style={{ display: 'grid', justifyContent: 'center' }}>
        <div
          style={{
            height: '25rem',
            width: '100%',
            backgroundColor: 'beige',
          }}
        >
          지도 띄울 부분
        </div>
        <div
          style={{
            height: '100rem',
            width: 'fit-content',
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
