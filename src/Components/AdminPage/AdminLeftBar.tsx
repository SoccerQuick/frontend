import React from 'react';

function AdminLeftBar() {
  return (
    <>
      <button style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}>
        관리자 메인
      </button>
      <button style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}>
        유저 관리
      </button>
      <button style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}>
        팀 관리
      </button>
      <button style={{ margin: '2rem 2rem', width: '14rem', height: '4rem' }}>
        고마오 관리
      </button>
    </>
  );
}

export default AdminLeftBar;
