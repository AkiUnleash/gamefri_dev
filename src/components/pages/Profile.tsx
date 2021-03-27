import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
// Component
import Header from '../organisms/Header_in';
import Profileform from '../organisms/Profileform';
// common
import { loginChack, authenticatedChack } from "../../common/backend/model"
// state
import { selectUser } from "../../common/state/userSlice"

const Profileedit: React.FC = () => {
  const user = useSelector(selectUser)

  useEffect(() => {
    // ログイン済みの確認
    loginChack();
    // メール認証確認
    authenticatedChack();
  }, []);

  return (
    <>
      <Header />
      {user.uid ? <Profileform /> : ""}
    </>
  );
};

export default Profileedit;