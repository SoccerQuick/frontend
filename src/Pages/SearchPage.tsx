import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchData from '../Components/SearchPage/Contents/SearchData';
import SearchModal from '../Components/SearchPage/Layout/SearchModal';
import HeaderCategory from '../Components/Commons/HeaderCategory';
import GroundComparison from '../Components/SearchPage/Contents/GroundComparison';
import ComparisonData from '../Components/SearchPage/Contents/ComparisonData';
import FeildSearchInput from '../Components/Search/FieldSearch';
import FieldMap from '../Components/SearchPage/Contents/FieldMap';

export interface groundDataType {
  title: string;
  image: string[];
  address: {
    shortAddress: string;
    fullAddress: string;
  };
  stadiums: { usage: string; facility: string; image: string[] }[];
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
  const [checkedInModal, setCheckedInModal] = useState<string[]>([]);
  const [showComparisonData, setShowComparisonData] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const location = useLocation();
  const searchValue = location.state?.searchValue || '서울';

  useEffect(() => {
    setSearchKeyword(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (checkedArray.length > 0) setShowComparisonModal(true);
    else setShowComparisonModal(false);
  }, [checkedArray]);

  console.log(searchKeyword);

  return (
    <>
      <Header />
      <HeaderCategory />
      <div style={{ justifyContent: 'center' }}>
        {searchKeyword && <FieldMap searchKeyword={searchKeyword} />}

        <div
          style={{
            height: '100rem',
            width: '98.4rem',
            margin: 'auto',
          }}
        >
          <div>
            <FeildSearchInput
              // searchInputValue={searchInputValue}
              // setSearchInputValue={setSearchInputValue}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
          </div>
          <SearchData
            showModal={showModal}
            setShowModal={setShowModal}
            modalData={modalData}
            setModalData={setModalData}
            checkedArray={checkedArray}
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
          checkedInModal={checkedInModal}
          setCheckedInModal={setCheckedInModal}
          showComparisonData={showComparisonData}
          setShowComparisonData={setShowComparisonData}
        />
      )}
      {showComparisonData && (
        <ComparisonData
          checkedArray={checkedArray}
          checkedInModal={checkedInModal}
          setShowComparisonData={setShowComparisonData}
        />
      )}
      <Footer />
    </>
  );
}

export default SearchPage;
