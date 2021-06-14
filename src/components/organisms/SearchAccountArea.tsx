import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { db } from '../../common/firebase/firebase'
import Textfield from '../atoms/Textfield'
import Button from '../atoms/Button'
import Usercard from '../Molecules/Usercard'
import styles from '../../assets/scss/organisms/search.module.scss'
import { selectUser } from "../../common/state/userSlice"
import { useSelector } from 'react-redux'
import Loader from '../atoms/Loader'
import algoliasearch from 'algoliasearch'

const SearchAccountArea: React.FC = () => {

  const client = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID || "",
    process.env.ALGOLIA_SEARCH_ONLY_API || "",
  );

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  // hookでの状態管理
  const [load, setLoad] = useState<boolean>(false)
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

  const accountFind = (e: React.ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();

    const index = client.initIndex(process.env.ALGOLIA_INDEX_ACCOUNT || "");
    index.search(keyword).then(({ hits }) => {
      console.log(hits);
      const accounts: any[] = hits.map(
        (doc: any) => (
          {
            profileId: doc.profileid,
            nickname: doc.nickname,
            avatarUrl: doc.avatarurl,
            introduction: doc.introduction,
            uid: doc.userID
          }
        )
      )
      setAccount(accounts)
    })
  }

  useEffect(() => {
    // クリック時の処理（検索）
    // オープン時にアカウントデータを表示（最新の５個）
    let account_temporary_storing: any
    const unSub = db.collection("user")
      .limit(5)
      .orderBy("create_at", 'desc')
      .onSnapshot((d) => {
        account_temporary_storing =
          d.docs.map((f) => (
            {
              profileId: f.data().profileid,
              nickname: f.data().nickname,
              avatarUrl: f.data().avatarurl,
              introduction: f.data().introduction,
              uid: f.data().userID
            }
          ))
        // 表示用のデータ
        setAccount(account_temporary_storing)
        setLoad(true);
      })
    return () => unSub()
  }, [])

  return (
    <>
      <div className={styles['container']}>

        <div className={styles["search-select"]}>
          <Link to="/search/account" className={styles["search-select__set"]}>アカウント</Link>
          <Link to="/search/diary" className={styles["search-select__none"]}>日記</Link>
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
              action={(e: React.ChangeEvent<HTMLInputElement>) => accountFind(e)} />
          </div>
        </div>

        {load &&
          user.uid && (account.map((field, index) =>
            <Usercard key={index}
              link={`/user/${field.profileId}`}
              photoUrl={field.avatarUrl}
              displayName={field.nickname}
              profileId={field.profileId}
              message={field.introduction}
              button={true}
              id={field.uid} />
          ))}
        {!load && <Loader />}
      </div>

    </>
  );
};

export default SearchAccountArea;