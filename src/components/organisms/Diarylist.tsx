import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../common/firebase/firebase'
// components
import Diarycard from '../Molecules/Diarycard'
// until
import * as DataInterface from '../../common/backend/model'
import { selectUser } from "../../common/state/userSlice"

const Diarylist: React.FC = () => {

  const user = useSelector(selectUser)


  const [follower, setFollower] = useState([
    {
      id: "",
      nickname: "",
      timestart: "",
      timeend: ""
    },
  ])

  // ログインユーザー取得
  useEffect(() => {
    const unSub = db
      .collection("user")
      .onSnapshot((snapshot) =>
        setFollower(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            nickname: doc.data().nickname,
            timestart: doc.data().timestart,
            timeend: doc.data().timeend,
          }))
        )
      );
    return () => { unSub(); };
  }, []);

  // console.log(user.uid);
  // console.log(follower);


  // const flowerColection = db.collection('user').doc('WgT1zgPqGHgUtB7AiRvXF0N8Dxa2').collection('followings')

  // // フォロワーの取得
  // let buff: any[] = []
  // flowerColection.onSnapshot((d) => {
  //   d.forEach((b) => {
  //     buff.push(b.id);
  //   })
  // })

  // console.log(buff);


  // // フォロワーのポストを取得
  // buff.forEach((d) => {
  //   console.log(d);
  //   const flowerpost = db.collection('user').doc(d).collection('posts')
  //   flowerpost.onSnapshot((b) => {
  //     console.log(b);
  //   })
  // })

  // フォロワーの取得
  // const flowerColection = DataInterface.subDataInport('user', user.uid, 'followings');
  // console.log(flowerColection);

  // flowerColection.((d) => {
  //   const folwer = DataInterface.dataInport('user', d.id)
  //   const folwerPost = DataInterface.subDataInport('user', d.id, 'posts')
  //   folwerPost.spnapshot((doc) => {
  //     buff.push({
  //       flower: folwer.data()?.nickname,
  //       postname: doc.id,
  //       title: doc.data().title
  //     });
  //   })
  // })




  return (
    <>
      {
        follower.map((f) => {
          <>
            <div>{f.id}</div>
            <div>{f.nickname}</div>
            <div>{f.timestart}</div>
            <div>{f.timeend}</div>
          </>
        })
      }
      <Diarycard />
    </>
  );
};

export default Diarylist;