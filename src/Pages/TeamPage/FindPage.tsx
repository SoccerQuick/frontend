import React from 'react';
import styled from 'styled-components';
import FindingMember from '../../Components/TeamPage/Contents/FindPage/FindingMember';
import FindingTeam from '../../Components/TeamPage/Contents/FindPage/FindingTeam';
import TeamPageModal from '../../Components/TeamPage/Layout/TeamPageModal';

type props = {
  findingTeam: boolean;
  findingMember: boolean;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function FindPage(props: props) {
  const findingTeam = props.findingTeam;
  const findingMember = props.findingMember;
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);

  return (
    <div style={{ width: '100%' }}>
      {showModal && (
        <TeamPageModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalData={modalData}
          setModalData={setModalData}
        />
      )}
      <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
        {findingMember && (
          <FindingMember
            showModal={showModal}
            setShowModal={setShowModal}
            modalData={modalData}
            setModalData={setModalData}
          />
        )}
      </div>
      <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
        {findingTeam && (
          <FindingTeam
            showModal={showModal}
            setShowModal={setShowModal}
            modalData={modalData}
            setModalData={setModalData}
          />
        )}
      </div>
    </div>
  );
}

export default FindPage;
