import React from 'react';

type data = {
  num: number;
  title: string;
  author: string;
  area: string;
  status: string;
  position: string;
  skill: string;
  gender: string;
};
function DetailModal(data: data) {
  console.log(data);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50,
        backgroundColor: 'beige',
        zIndex: 0,
      }}
    >
      {data.position}
    </div>
  );
}

export default DetailModal;
