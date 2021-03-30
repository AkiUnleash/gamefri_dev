import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../common/firebase/firebase'
// components
import Diarycard from '../Molecules/Diarycard'
// until
import { selectUser } from "../../common/state/userSlice"

const Diarylist: React.FC = () => {
  const user = useSelector(selectUser);
  const [post, setPost] = useState([
    {
      id: "",
      title: "",
      body: "",
      gametitle: "",
      likecount: 0,
      attachUrl: "",
      displayName: "",
      avatarUrl: "",
      link: "",
      create_at: ""
    },
  ])

  // フォロワーの日記データ取得
  useEffect(() => {
    user.follower.forEach(async (follower) => {
      const f = await db.collection("user").doc(follower).get()
      const nickname = f.data()?.nickname
      const avatarUrl = f.data()?.avatarurl
      const profileID = f.data()?.profileid

      db.collection("user")
        .doc(follower)
        .collection("posts")
        .orderBy("create_at", "desc")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => (
            setPost(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                body: doc.data().body,
                gametitle: doc.data().gamename,
                link: '/' + profileID + '/status/' + doc.id,
                likecount: 0,
                displayName: nickname,
                avatarUrl: avatarUrl,
                attachUrl: doc.data().attachimage,
                create_at: `${doc.data().create_at.toDate().getFullYear()}/${("00" + (doc.data().create_at.toDate().getMonth() + 1)).slice(-2)}/${("00" + doc.data().create_at.toDate().getDate()).slice(-2)}`,
              }))
            )
          ))
        }
        );
    })
  }, []);


  return <div>
    {
      post[0]?.id && (
        <>
          {post.map((p, index) => (
            <Diarycard key={index}
              title={p.title}
              gametitle={p.gametitle}
              attach_photo={p.attachUrl}
              likecount={p.likecount}
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
};

export default Diarylist;