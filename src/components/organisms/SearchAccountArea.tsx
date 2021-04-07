import React, { useEffect, useState } from 'react';
import Textfield from '../atoms/Textfield'
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation'
import mui from '../../assets/css/mui.module.css'
import styles from '../../assets/scss/search.module.scss'

const SearchAccountArea: React.FC = () => {

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
  })

  return (
    <>
      <div className={styles['container']}>

        <div className={styles["search-select"]}>
          <a href="" className={styles["search-select__set"]}>アカウント</a>
          <a href="" className={styles["search-select__none"]}>日記</a>
        </div>

        <div className={styles["search-bar"]}>
          <div className={styles["search-bar__text"]}>
            <Textfield
              type="text"
              placeholder="検索キーワードを入力しましょう。"
              id={"keyword"}
              value={keyword}
              setValue={setKeyword}
              label="検索バー" />
          </div>

          <div className={styles["search-bar__button"]}>
            <Button
              classDiv="submit__button"
              classButton={"検索"}
              value={"検索"}
              action={() => {
                console.log('aaa');
              }} />
          </div>
        </div>

        <a href="">
          <div className={styles["user-card"]}>
            <div className={styles["user-card__first-line"]}>
              <div className={styles["user-card__first-line--infomation"]}>
                <UserInfomation
                  photoUrl="https://firebasestorage.googleapis.com/v0/b/gamefri-develop.appspot.com/o/avatar%2F5eFXPtoOtEVWSgGf_onepiece01_luffy.png?alt=media&token=d2dbaee5-24fb-4b7f-9106-08213fbc4830"
                  displayName="アキ・アンリッシュ"
                  date="@AkiUnleash"
                />
              </div>
              <div className={styles["user-card__first-line--follow"]}>
                <Button
                  classDiv=""
                  classButton={"follow__button--yet"}
                  value={"フォロー"}
                  action={() => {
                    console.log('aaa');
                  }} />
              </div>
            </div>
            <div className="user-card__introduction"> 一緒にゲームをしましょう！ </div>
          </div>
        </a>
      </div>

    </>
  );
};

export default SearchAccountArea;