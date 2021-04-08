import React, { useEffect, useState } from 'react';
import { db } from '../../common/firebase/firebase'
import Textfield from '../atoms/Textfield'
import Button from '../atoms/Button'
import Usercard from '../Molecules/Usercard'
import styles from '../../assets/scss/search.module.scss'

const SearchAccountArea: React.FC = () => {

  const [keyword, setKeyword] = useState('')
  const [account, setAccount] = useState([
    {
      profileId: "",
      nickname: "",
      avatarUrl: "",
      introduction: ""
    }
  ])
  const [accountall, setAccountall] = useState([
    {
      profileId: "",
      nickname: "",
      avatarUrl: "",
      introduction: ""
    }
  ])

  useEffect(() => {
    db.collection("user")
      .onSnapshot((d) => {
        setAccount(
          d.docs.map((f) => (
            {
              profileId: f.data().profileid,
              nickname: f.data().nickname,
              avatarUrl: f.data().avatarurl,
              introduction: f.data().introduction
            }
          ))
        )
      })
    db.collection("user")
      .onSnapshot((d) => {
        setAccountall(
          d.docs.map((f) => (
            {
              profileId: f.data().profileid,
              nickname: f.data().nickname,
              avatarUrl: f.data().avatarurl,
              introduction: f.data().introduction
            }
          ))
        )
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

        {(account.map((field, index) =>
          <Usercard key={index}
            link={`/user/${field.profileId}`}
            photoUrl={field.avatarUrl}
            displayName={field.nickname}
            profileId={field.profileId}
            introduction={field.introduction} />
        ))}

      </div>

    </>
  );
};

export default SearchAccountArea;