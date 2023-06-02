import React from 'react';

const ClipUrl = (url: string, message: string) => {
  const textarea = document.createElement('textarea');

  document.body.appendChild(textarea);
  textarea.value = url;
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert(message);
};

export default ClipUrl;
