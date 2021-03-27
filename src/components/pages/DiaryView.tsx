import React from 'react';
// Component
import Header from '../organisms/Header_in';
import Diarydisplay from '../organisms/DIarydisplay'
// common

const Diaryview: React.FC = () => {

  return (
    <>
      <Header />
      <Diarydisplay />
    </>
  );
};

export default Diaryview;