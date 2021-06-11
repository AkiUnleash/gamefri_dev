import React from 'react';
import { useSelector } from 'react-redux'
import { selectUser } from "../../common/state/userSlice"
import Header from '../organisms/Header_in';
import Diarydisplay from '../organisms/DIarydisplay'

const Diaryview: React.FC = () => {

  // Reduxにて状態管理のデータを取得
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