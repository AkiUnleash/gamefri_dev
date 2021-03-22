import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
// assets
import styles from '../../assets/scss/home.module.scss';
// Component
import Diarylist from '../organisms/Diarylist';
import Header from '../organisms/Header_in';
// state
import { selectUser } from "../../common/state/userSlice"
// common
import { loginChack, authenticatedChack, profileDocumentExistence } from "../../common/backend/model"


const Home: React.FC = () => {
  const user = useSelector(selectUser)

  useEffect(() => {
    // ログイン済みの確認
    loginChack();
    // メール認証確認
    authenticatedChack();
    // プロフィール入力有無確認
    profileDocumentExistence();
  }, []);

  return (
    <>
      <Header />
      {user.uid ?
        (<div className={styles["cardaria"]}>
          <Diarylist />
        </div>) : ""}
    </>
  );
};

export default Home;