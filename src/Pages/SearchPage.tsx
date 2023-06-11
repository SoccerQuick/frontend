import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchData from '../Components/SearchPage/Contents/SearchData';
import HeaderCategory from '../Components/Commons/HeaderCategory';
import GroundComparison from '../Components/SearchPage/Contents/GroundComparison';
import ComparisonData from '../Components/SearchPage/Contents/ComparisonData';
import FeildSearchInput from '../Components/Search/FieldSearch';
import FieldMap from '../Components/SearchPage/Contents/FieldMap';
import axios from 'axios';
import { info } from 'console';

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

export interface DomDataType {
  [key: string]: string | number | boolean | [] | {};
  address: { area: string; fullAddress: string };
  ball: boolean;
  beverage: boolean;
  bibs: boolean;
  dom_id: string;
  lat: number;
  lng: number;
  parking: boolean;
  parking_fee: string;
  parking_free: boolean;
  partnership: boolean;
  shoes: boolean;
  shower: boolean;
  source: string;
  stadiums: {
    id: number;
    info: string;
    inout_door: string;
    inoutdoor_nm: string;
    name: string;
    size_x: number;
    size_y: number;
    stadium_type: string;
    stadium_type_nm: string;
    _id: string;
    images: {
      id: number;
      image: string;
    }[];
  }[];
  title: string;
  toilet: boolean;
  url: string;
  usersFavorites: [];
  wear: string;
  _id: number;
}

function SearchPage() {
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [checkedArray, setCheckedArray] = useState<DomDataType[]>([]);
  const [checkedInModal, setCheckedInModal] = useState<string[]>([]);
  const [showComparisonData, setShowComparisonData] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalDomData, setTotalDomData] = useState<DomDataType[]>([]);
  const [sortedDomData, setSortedDomData] = useState<DomDataType[]>([]);

  const location = useLocation();
  const searchValue = location.state?.searchValue || '서울';

  useEffect(() => {
    setSearchKeyword(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (checkedArray.length > 0) setShowComparisonModal(true);
    else setShowComparisonModal(false);
  }, [checkedArray]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/doms`, {
        withCredentials: true,
      })
      .then((res: any) => {
        console.log(res);
        setTotalDomData(res.data.data);
      })
      .catch((e: any) => console.log(e));
  }, []);

  return (
    <>
      <Header />
      <HeaderNavContainer>
        <HeaderCategory />
        <FeildSearchInput
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      </HeaderNavContainer>
      <div style={{ justifyContent: 'center' }}>
        {searchKeyword && (
          <FieldMap
            searchKeyword={searchKeyword}
            totalDomData={totalDomData}
            setSortedDomData={setSortedDomData}
          />
        )}

        <div
          style={{
            width: '98.4rem',
            margin: 'auto',
          }}
        >
          <SearchData
            checkedArray={checkedArray}
            setCheckedArray={setCheckedArray}
            sortedDomData={sortedDomData}
            setSortedDomData={setSortedDomData}
          />
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

const HeaderNavContainer = styled.div`
  position: relative;
  height: 8rem;
  width: 98.4rem;
  margin: 0 auto;
`;
