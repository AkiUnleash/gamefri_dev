import React, { useEffect, useState } from 'react';
import { db } from '../../common/firebase/firebase'
import Textfield from '../atoms/Textfield'
import Button from '../atoms/Button'
import Usercard from '../Molecules/Usercard'
import styles from '../../assets/scss/organisms/search.module.scss'
import { selectUser } from "../../common/state/userSlice"
import { useSelector } from 'react-redux'

const SearchAccountArea: React.FC = () => {

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  // hookでの状態管理
  const [keyword, setKeyword] = useState('')
  const [account, setAccount] = useState([
    {
      profileId: "",
      nickname: "",
      avatarUrl: "",
      introduction: "",
      uid: ""
    }
  ])
  const [accountall, setAccountall] = useState([
    {
      profileId: "",
      nickname: "",
      avatarUrl: "",
      introduction: "",
      uid: ""
    }
  ])

  useEffect(() => {
    // オープン時にアカウントデータの全表示
    let account_temporary_storing: any
    db.collection("user")
      .onSnapshot((d) => {
        account_temporary_storing =
          d.docs.map((f) => (
            {
              profileId: f.data().profileid,
              nickname: f.data().nickname,
              avatarUrl: f.data().avatarurl,
              introduction: f.data().introduction,
              uid: f.data().uid
            }
          ))
        // 表示用のデータ
        setAccount(account_temporary_storing)
        // 検索の元となるデータ
        setAccountall(account_temporary_storing)
      })
  }, [])

  return (
    <>
      <div className={styles['container']}>

        <div className={styles["search-select"]}>
          <a href="/search/account" className={styles["search-select__set"]}>アカウント</a>
          <a href="/search/diary" className={styles["search-select__none"]}>日記</a>
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
              action={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                if (keyword) {
                  setAccount(accountall.filter((a) => ~a.nickname.indexOf(keyword)));
                } else {
                  setAccount(accountall)
                }
              }} />
          </div>
        </div>

        {user.uid && (account.map((field, index) =>
          <Usercard key={index}
            link={`/user/${field.profileId}`}
            photoUrl={field.avatarUrl}
            displayName={field.nickname}
            profileId={field.profileId}
            message={field.introduction}
            button={true}
            id={field.uid} />
        ))}

      </div>

    </>
  );
};

export default SearchAccountArea;