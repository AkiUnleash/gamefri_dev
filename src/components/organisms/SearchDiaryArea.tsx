import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { db } from '../../common/firebase/firebase'
import Textfield from '../atoms/Textfield'
import Button from '../atoms/Button'
import Diarycard from '../Molecules/Diarycard'
import styles from '../../assets/scss/organisms/search.module.scss'
import Loader from '../atoms/Loader'
import algoliasearch from 'algoliasearch'
import moment from 'moment'

type post = {
  id: string,
  title: string,
  body: string,
  gametitle: string,
  nicecount: number,
  attachUrl: string,
  displayName: string,
  avatarUrl: string,
  link: string,
  create_at: string,
  profileid: string,
  avatarurl: string,
  nickname: string,
}

const SearchDiaryArea: React.FC = () => {

  const client = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID || "",
    process.env.ALGOLIA_SEARCH_ONLY_API || "",
  );

  // hookでの状態管理
  const [load, setLoad] = useState<boolean>(false)
  const [keyword, setKeyword] = useState('')
  const [post, setPost] = useState<post[]>([])

  const postsFind = (e: React.ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();

    const index = client.initIndex(process.env.ALGOLIA_INDEX_POST || "");
    index.search(keyword).then(({ hits }) => {
      const posts: any[] = hits.map(
        (doc: any) => (
          {
            id: doc.objectID,
            title: doc.title,
            body: doc.body,
            gametitle: doc.gamename,
            link: '/' + doc.profileid + '/status/' + doc.id,
            nicecount: doc.nicecount,
            displayName: doc.nickname,
            avatarUrl: doc.avatarurl,
            attachUrl: doc.attachimage,
            create_at: `${moment(doc.create_at._seconds * 1000).format('YYYY/MM/DD')}`
          }

        )
      )

      setPost(posts)
    })
  }

  useEffect(() => {
    let diary_temporary_storing: any
    db.collectionGroup('posts')
      .orderBy('create_at', 'desc')
      .get()
      .then((snapshot) => {
        diary_temporary_storing = snapshot.docs.map((doc) => (
          {
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            gametitle: doc.data().gamename,
            link: '/' + doc.data().profileid + '/status/' + doc.id,
            nicecount: doc.data().nicecount,
            displayName: doc.data().nickname,
            avatarUrl: doc.data().avatarurl,
            attachUrl: doc.data().attachimage,
            create_at: `${doc.data().create_at.toDate().getFullYear()}/${("00" + (doc.data().create_at.toDate().getMonth() + 1)).slice(-2)}/${("00" + doc.data().create_at.toDate().getDate()).slice(-2)}`,
          }
        ))
        setPost(diary_temporary_storing)
        // 読み込み完了
        setLoad(true);
      })
  }, [])

  return (
    <>
      <div className={styles['container']}>

        <div className={styles["search-select"]}>
          <Link to="/search/account" className={styles["search-select__none"]}>アカウント</Link>
          <Link to="/search/diary" className={styles["search-select__set"]}>日記</Link>
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
              action={(e: React.ChangeEvent<HTMLInputElement>) => { postsFind(e) }} />
          </div>
        </div>

        {load &&
          post[0]?.id && (
            <>
              {post.map((p, index) => (
                <Diarycard key={index}
                  title={p.title}
                  gametitle={p.gametitle}
                  attach_photo={p.attachUrl}
                  nicecount={p.nicecount}
                  link={p.link}
                  displayName={p.displayName}
                  avatar_photo={p.avatarUrl}
                  create_at={p.create_at}
                />
              ))}
            </>
          )
        }
        {!load && <Loader />}
      </div>
    </>
  );
};

export default SearchDiaryArea;