import React, { useEffect } from 'react';
import Header from '../organisms/Header_in';
import NotificationArea from '../organisms/NotificationArea'
import { loginChack_yat, authenticatedChack, profileDocumentExistence } from "../../common/backend/model"
import { selectUser } from '../../common/state/userSlice'
import { useSelector } from 'react-redux'

const Home: React.FC = () => {

  const user = useSelector(selectUser)

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
      { user.uid && <NotificationArea />}
    </>
  );
};

export default Home;