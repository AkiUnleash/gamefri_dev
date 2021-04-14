import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from '../../common/firebase/firebase'
import { selectUser } from "../../common/state/userSlice"
import styles from '../../assets/scss/organisms/diarydisplay.module.scss';
import UserInfomation from '../atoms/UserInfomation';
import CommentsArea from '../Molecules/CommentsArea'
import NiceButtonArea from '../Molecules/NiceButtonArea'

const Diarydisplay: React.FC = () => {

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser);

  // URLのパラメーターを取得
  const { profileid, postid } = useParams<{ profileid: string, postid: string }>()

  // hookでの状態管理
  const [post, setPost] = useState({
    postUserId: "",
    gameTitle: "",
    diaryTitle: "",
    photoUrl: "",
    displayName: "",
    createDate: "",
    attachImage: "",
    diaryBody: "",
    niceCount: 0,
  })

  useEffect(() => {
    db.collection("user")
      .where('profileid', '==', profileid)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const userid = doc.id
          db.collection("user")
            .doc(userid)
            .collection("posts")
            .doc(postid)
            .onSnapshot((doc) => {
              setPost({
                postUserId: userid,
                gameTitle: doc.data()?.gamename,
                diaryTitle: doc.data()?.title,
                photoUrl: doc.data()?.avatarurl,
                displayName: doc.data()?.nickname,
                createDate: `${doc.data()?.create_at.toDate().getFullYear()}/${("00" + (doc.data()?.create_at.toDate().getMonth() + 1)).slice(-2)}/${("00" + doc.data()?.create_at.toDate().getDate()).slice(-2)}`,
                attachImage: doc.data()?.attachimage,
                diaryBody: doc.data()?.body,
                niceCount: doc.data()?.nicecount
              })
            })
        })
      }
      );
  }, []);


  return <>
    <div className={styles["container"]}>

      {post.postUserId && user.uid ? (
        <NiceButtonArea
          documents1={post.postUserId}
          documents2={postid}
          documents3={user.uid}
          nicecount={post.niceCount}
          diaryTitle={post.diaryTitle}
        />
      ) : ""}

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
        {post.attachImage && (
          <div className={styles["diary-main__img-div"]}>
            <img className={styles["diary-main__img"]} src={post.attachImage} alt="attach photos" />
          </div>
        )}
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