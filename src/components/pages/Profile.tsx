import React, { useEffect } from 'react';
// Component
import Header from '../organisms/Header_in';
import Profileform from '../organisms/Profileform';
// common
import { loginChack, authenticatedChack } from "../../common/backend/model"

const Profileedit: React.FC = () => {

  useEffect(() => {
    // ログイン済みの確認
    loginChack();
    // メール認証確認
    authenticatedChack();
  }, []);

  return (
    <>
      <Header />
      <Profileform />
    </>
  );
};

export default Profileedit;