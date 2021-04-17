import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../common/firebase/firebase'
import Diarycard from '../molecules/Diarycard'
import { selectUser } from "../../common/state/userSlice"
import Loader from '../atoms/Loader'
import styles from '../../assets/scss/organisms/diarylist.module.scss'

const Diarylist: React.FC = () => {

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser);

  // hookでの状態管理
  const [load, setLoad] = useState<boolean>(false)
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
      create_at: ""
    },
  ])

  useEffect(() => {
    let posts: any = []
    // フォロワーを取得し日記データを取得する。
    user.follower.forEach(async (follower, index, array) => {
      const f = await db.collection("user").doc(follower).get()
      db.collection("user")
        .doc(follower)
        .collection("posts")
        .orderBy("create_at", "desc")
        .onSnapshot((snapshot) => {
          const p = snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            gametitle: doc.data().gamename,
            link: '/' + f.data()?.profileid + '/status/' + doc.id,
            nicecount: doc.data().nicecount,
            displayName: f.data()?.nickname,
            avatarUrl: f.data()?.avatarurl,
            attachUrl: doc.data().attachimage,
            create_at: `${doc.data().create_at.toDate().getFullYear()}/${("00" + (doc.data().create_at.toDate().getMonth() + 1)).slice(-2)}/${("00" + doc.data().create_at.toDate().getDate()).slice(-2)}`,
          }))

          // フォロワーの日記データを蓄積していく。
          posts.push(...p)

          // 最終ループ時に、useStateに挿入。
          if ((index + 1) === array.length) {
            // Sort 
            posts.sort((a: any, b: any) => {
              if (a.create_at > b.create_at) { return -1; } else { return 1; }
            })
            setPost(posts)
            setLoad(true)
          }
        }
        );
    })
  }, []);


  return <div>
    {
      load &&
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
    {
      load &&
      !post[0]?.id && (
        <>
          <div>上の検索ボタンを押して、誰かをフォローしてください。</div>
          <div>フォローしたアカウントの日記が見られます。</div>
        </>
      )
    }
    {!load && <Loader />}
  </div>
};

export default Diarylist;