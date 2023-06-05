import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchData from '../Components/SearchPage/Contents/SearchData';
import SearchModal from '../Components/SearchPage/Layout/SearchModal';
import HeaderCategory from '../Components/Commons/HeaderCategory';
import GroundComparison from '../Components/SearchPage/Contents/GroundComparison';

export interface groundDataType {
  title: string;
  image: string[];
  address: {
    shortAddress: string;
    fullAddress: string;
  };
  provided: string[];
  nonProvided: string[];
  reservation: {
    [key: string]: string[];
  };
  url: string;
  source: string;
}

function SearchPage() {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [checkedArray, setCheckedArray] = useState<groundDataType[]>([]);

  useEffect(() => {
    if (checkedArray.length > 0) setShowComparisonModal(true);
    else setShowComparisonModal(false);
  }, [checkedArray]);

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
            setCheckedArray={setCheckedArray}
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
      {showComparisonModal && (
        <GroundComparison
          checkedArray={checkedArray}
          setCheckedArray={setCheckedArray}
          showComparisonModal={showComparisonModal}
          setShowComparisonModal={setShowComparisonModal}
        />
      )}
      <Footer />
    </>
  );
}

export default SearchPage;
