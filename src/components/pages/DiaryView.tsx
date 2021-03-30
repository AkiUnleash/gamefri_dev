import React from 'react';
import { useSelector } from 'react-redux'
import { selectUser } from "../../common/state/userSlice"
// Component
import Header from '../organisms/Header_in';
import Diarydisplay from '../organisms/DIarydisplay'
// common

const Diaryview: React.FC = () => {
  const user = useSelector(selectUser)

  return (
    <>
      <Header />
      {user.uid ?
        <Diarydisplay /> : ""}
    </>
  );
};

export default Diaryview;