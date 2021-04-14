import React, { useEffect, useState } from 'react';
import { db } from '../../common/firebase/firebase'
import Textfield from '../atoms/Textfield'
import Button from '../atoms/Button'
import Diarycard from '../molecules/Diarycard'
import styles from '../../assets/scss/organisms/search.module.scss'

const SearchAccountArea: React.FC = () => {

  // hookでの状態管理
  const [keyword, setKeyword] = useState('')
  const [post, setPost] = useState([
    {
      id: "",
      title: "",
      body: "",
      gametitle: "",
      nicecount: 0,
      attachUrl: "",
      displayName: "",
      avatarUrl: "",
      link: "",
      create_at: "",
      profileid: "",
      avatarurl: "",
      nickname: "",
    },
  ])
  const [postall, setPostall] = useState([
    {
      id: "",
      title: "",
      body: "",
      gametitle: "",
      nicecount: 0,
      attachUrl: "",
      displayName: "",
      avatarUrl: "",
      link: "",
      create_at: "",
      profileid: "",
      avatarurl: "",
      nickname: "",
    },
  ])

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
        setPostall(diary_temporary_storing)
      })

  }, [])

  return (
    <>
      <div className={styles['container']}>

        <div className={styles["search-select"]}>
          <a href="/search/account" className={styles["search-select__none"]}>アカウント</a>
          <a href="/search/diary" className={styles["search-select__set"]}>日記</a>
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
                  setPost(
                    postall.filter((a) => {
                      if (~a.title.indexOf(keyword)
                        || ~a.gametitle.indexOf(keyword)
                        || ~a.body.indexOf(keyword)
                      ) {
                        return true
                      }
                    })
                  )
                } else {
                  setPost(postall)
                }
              }} />
          </div>
        </div>

        {
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

      </div>

    </>
  );
};

export default SearchAccountArea;