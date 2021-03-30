import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from '../../common/firebase/firebase'
import { selectUser } from "../../common/state/userSlice"
import styles from '../../assets/scss/diarydisplay.module.scss';
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation';
import { dataAdd, dataDelete } from "../../common/backend/model"
import { nice } from '../../common/utils/common-types'
import CommentsArea from '../Molecules/CommentsArea'


const Diarydisplay: React.FC = () => {
  const user = useSelector(selectUser);

  const { profileid, postid } = useParams<{ profileid: string, postid: string }>()

  const [action, setAction] = useState({
    style: "",
    value: 0,
    caption: "",
    function: () => { }
  })

  const [post, setPost] = useState({
    postUserId: "",
    gameTitle: "",
    diaryTitle: "",
    photoUrl: "",
    displayName: "",
    createDate: "",
    attachImage: "",
    diaryBody: "",
  })

  useEffect(() => {
    db.collection("user")
      .where('profileid', '==', profileid)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const userid = doc.id
          const photoUrl = doc.data().avatarurl
          const nickname = doc.data().nickname

          db.collection("user")
            .doc(userid)
            .collection("posts")
            .doc(postid)
            .onSnapshot((doc) => {
              setPost({
                postUserId: userid,
                gameTitle: doc.data()?.gamename,
                diaryTitle: doc.data()?.title,
                photoUrl: photoUrl,
                displayName: nickname,
                createDate: `${doc.data()?.create_at.toDate().getFullYear()}/${("00" + (doc.data()?.create_at.toDate().getMonth() + 1)).slice(-2)}/${("00" + doc.data()?.create_at.toDate().getDate()).slice(-2)}`,
                attachImage: doc.data()?.attachimage,
                diaryBody: doc.data()?.body,
              })
              // niceボタン
              const nicedoc =
                db.collection('user')
                  .doc(doc.id)
                  .collection("posts")
                  .doc(postid)
                  .collection("nices")
                  .doc(user.uid)
                  .get()
              nicedoc.then((data) => {
                if (data.exists) {
                  setAction({
                    style: "nice__button--un_nice",
                    value: doc.data()?.nicecount,
                    caption: `Nice! ${doc.data()?.nicecount}`,
                    function: () => { un_nice() }
                  })
                } else {
                  setAction({
                    style: "nice__button--to_nice",
                    value: doc.data()?.nicecount,
                    caption: `Nice! ${doc.data()?.nicecount}`,
                    function: () => { to_nice() }
                  })
                }
              })
            })
        })
      }
      );
  }, []);

  const to_nice = () => {
    const nice: nice = { userID: user.uid }

    dataAdd(
      nice, {
      colection1: "user",
      documents1: post.postUserId,
      colection2: "posts",
      documents2: postid,
      colection3: "nices",
      documents3: user.uid
    }, true)

    setAction((n) => ({
      style: "nice__button--un_nice",
      value: n.value + 1,
      caption: "Nice! " + (n.value + 1),
      function: () => { un_nice() }
    }))
  }

  const un_nice = () => {
    dataDelete(
      {
        colection1: "user",
        documents1: post.postUserId,
        colection2: "posts",
        documents2: postid,
        colection3: "nices",
        documents3: user.uid
      },
    )
    setAction((n) => ({
      style: "nice__button--to_nice",
      value: n.value - 1,
      caption: "Nice! " + (n.value - 1),
      function: () => { to_nice() }
    }))
  }

  return <>
    <div className={styles["container"]}>

      <Button
        classDiv="nice__div"
        classButton={action.style}
        value={action.caption}
        action={() => {
          action.function()
        }}
      />

      <div className={styles["diary-infomation"]}>
        <div className={styles["diary-infomation__game"]}>{post.gameTitle}</div>
        <h1 className={styles["diary-infomation__title"]}>{post.diaryTitle}</h1>
      </div>

      <UserInfomation
        photoUrl={post.photoUrl}
        displayName={post.displayName}
        date={post.createDate}
      />

      <div className={styles["diary-main"]}>
        <div className={styles["diary-main__img-div"]}>
          <img className={styles["diary-main__img"]} src={post.attachImage} alt="attach photos" />
        </div>
        <p className={styles["diary-main__sentence"]}>
          {post.diaryBody}
        </p>
      </div>

      {post.postUserId ? (
        <CommentsArea
          postUser={post.postUserId}
          postID={postid}
          commentUserID={user.uid}
          commentUserPhotoURL={user.photoUrl}
          commentUserDisplayName={user.displayName}
        />) : ""
      }

    </div>
  </>
};

export default Diarydisplay;