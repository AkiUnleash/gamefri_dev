import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import Header from '../organisms/Header_in';
import Profileform from '../organisms/Profileform';
import { loginChack_yat, authenticatedChack } from "../../common/backend/model"
import { selectUser } from "../../common/state/userSlice"

const Profileedit: React.FC = () => {

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  useEffect(() => {
    // ログイン済みの確認
    loginChack_yat();
    // メール認証確認
    authenticatedChack();
    return () => {
      loginChack_yat();
      authenticatedChack();
    }
  }, []);

  return (
    <>
      <Header />
      {user.uid ? <Profileform /> : ""}
    </>
  );
};

export default Profileedit;