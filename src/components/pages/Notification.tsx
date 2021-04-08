import React, { useEffect } from 'react';
import Header from '../organisms/Header_in';
import NotificationArea from '../organisms/NotificationArea'
import { loginChack_yat, authenticatedChack, profileDocumentExistence } from "../../common/backend/model"


const Home: React.FC = () => {

  useEffect(() => {
    // ログイン済みの確認
    loginChack_yat();
    // メール認証確認
    authenticatedChack();
    // プロフィール入力有無確認
    profileDocumentExistence();
  }, []);

  return (
    <>
      <Header />
      <NotificationArea />
    </>
  );
};

export default Home;