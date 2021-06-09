import React, { useEffect } from 'react';
import styles from '../../assets/scss/pages/price.module.scss';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { loginChack_done } from "../../common/backend/model"


const Detail1: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["price-card"]}>
        <div className={styles["price-card__title"]}>標準プラン</div>
        <div className={styles["price-card__price"]}>無 料</div>
        <div className={styles["price-card__discription"]}>日記の投稿、プロフィールの編集、ユーザーのフォロー機能、コメント付与</div>
        <div className={styles["price-card__button"]}><a className={styles["price-card__button--fill"]} href="./signup">新規アカウント作成</a></div>
      </div>
    </div>
  )
};

const Price: React.FC = () => {

  useEffect(() => {
    // 既にログイン済みの場合はHomeへ移動
    loginChack_done()
    return () => loginChack_done()
  }, [])

  return (
    <>
      <Header />
      <Detail1 />
      <Footer />
    </>
  );
};

export default Price;