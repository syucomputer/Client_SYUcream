import React from 'react';
import './BackButton.css';

const BackButton = ({ onClick }) => {
  const defaultStyle = "backButton"

  return (
    <button className={`${defaultStyle}`} onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <polyline points="15 18 9 12 15 6" />
        <line x1="10" y1="12" x2="20" y2="12" />
      </svg>
    </button>
  );
};

export default BackButton;
