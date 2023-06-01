import React from 'react';

const ClipUrl = (url: string) => {
  const textarea = document.createElement('textarea');

  document.body.appendChild(textarea);

  textarea.value = url;
  textarea.select(); //textarea를 설정
  document.execCommand('copy');
  document.body.removeChild(textarea);

  alert('주소가 복사되었습니다.');
};

export default ClipUrl;
