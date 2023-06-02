import React from 'react';
import styled from 'styled-components';
import FindingMember from '../../Components/TeamPage/Contents/FindingMember';
import FindingTeam from '../../Components/TeamPage/Contents/FindingTeam';
import TeamPageModal from '../../Components/TeamPage/Layout/TeamPageModal';

function FindPage() {
  // const [data, setData] = React.useState<any[]>([]); // axios 할 때 사용할 수 있으므로 남겨둔다.
  const [findingTeam, setFindingTeam] = React.useState<boolean>(true);
  const [findingMember, setFindingMember] = React.useState<boolean>(true);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);

  return (
    <>
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
    </>
  );
}

export default FindPage;
