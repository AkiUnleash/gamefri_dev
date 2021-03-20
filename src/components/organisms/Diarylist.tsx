import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../common/firebase/firebase'
// components
import Diarycard from '../Molecules/Diarycard'
// until
import * as DataInterface from '../../common/backend/model'
import { selectUser } from "../../common/state/userSlice"

const Diarylist: React.FC = () => {
  const user = useSelector(selectUser);
  const [post, setPost] = useState([
    {
      id: "",
      title: "",
      body: "",
      gametitle: ""
    },
  ])

  // フォロワーの日記データ取得
  useEffect(() => {
    user.follower.forEach((follower) => {
      db.collection("user")
        .doc(follower)
        .collection("posts")
        .onSnapshot((snapshot) =>
          setPost(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().title,
              body: doc.data().body,
              gametitle: doc.data().gametitle
            }))
          )
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
              gametitle={p.gametitle} />
          ))}
        </>
      )
    }
  </div>
};

export default Diarylist;