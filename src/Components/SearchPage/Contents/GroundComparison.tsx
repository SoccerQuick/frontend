import React, { useEffect, useState } from 'react';
import { groundDataType } from '../../../Pages/SearchPage';
import styled from 'styled-components';

interface GroundComparisonProps {
    checkedArray: groundDataType[];
    setCheckedArray: React.Dispatch<React.SetStateAction<groundDataType[]>>;
    showComparisonModal: boolean;
    setShowComparisonModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroundComparison: React.FC<GroundComparisonProps> = ({checkedArray, setCheckedArray, showComparisonModal, setShowComparisonModal })=> {


  useEffect(()=> {
    if(checkedArray.length>0) setShowComparisonModal(true);
    else setShowComparisonModal(false);
  },[checkedArray])

  console.log(checkedArray)

  return (<></>);
}
export default GroundComparison;