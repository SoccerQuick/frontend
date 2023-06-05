import React from 'react';
import styled from 'styled-components';
import FindingMember from '../../Components/TeamPage/Contents/FindPage/FindingMember';
import FindingTeam from '../../Components/TeamPage/Contents/FindPage/FindingTeam';
import TeamPageModal from '../../Components/TeamPage/Layout/TeamPageModal';

type props = {
  findingTeam: boolean;
  findingMember: boolean;
};

function FindPage(props: props) {
  const { findingTeam, findingMember } = props;
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);

  return (
    <div style={{ width: '100%' }}>
      {showModal && (
        <TeamPageModal setShowModal={setShowModal} modalData={modalData} />
      )}
      <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
        {findingMember && (
          <FindingMember
            setShowModal={setShowModal}
            setModalData={setModalData}
          />
        )}
      </div>
      <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
        {findingTeam && (
          <FindingTeam
            setShowModal={setShowModal}
            setModalData={setModalData}
          />
        )}
      </div>
    </div>
  );
}

export default FindPage;
