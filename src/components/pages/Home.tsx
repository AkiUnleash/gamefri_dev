import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import styles from '../../assets/scss/pages/home.module.scss';
import Header from '../organisms/Header_in';
import Postbutton from '../atoms/Postbutton';
import Diarylist from '../organisms/Diarylist';
import { selectUser } from "../../common/state/userSlice"
import { loginChack_yat, authenticatedChack, profileDocumentExistence } from "../../common/backend/model"


const Home: React.FC = () => {

  // Reduxにて状態管理のデータを取得
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
      {user.uid ?
        <Header /> : ""}
      <Postbutton
        link="/diarywrite" />
      {user.uid ?
        (<div className={styles["cardaria"]}>
          <Diarylist />
        </div>) : ""}
    </>
  );
};

export default Home;