import React, { useState, useEffect } from 'react';
import styles from '../../assets/scss/Molecules/commentsarea.module.scss';
import Textarea from '../atoms/Textarea'
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation';
import { dataAdd } from "../../common/backend/model"
import { db } from '../../common/firebase/firebase'

// このコンポーネントで扱う型宣言
type props = {
  postUser: string,
  postID: string,
  commentUserID: string,
  commentUserPhotoURL: string,
  commentUserDisplayName: string
}

const CommentsArea: React.FC<props> = (props: props) => {

  // hookでの状態管理
  const [comments, setComments] = useState([{
    photoUrl: "",
    displayName: "",
    date: "",
    comment: "",
  }])
  const [comment, setComment] = useState('')

  // 登録ボタンクリック時の処理
  const onClickRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dataAdd(
      {
        photoUrl: props.commentUserPhotoURL,
        displayName: props.commentUserDisplayName,
        comment: comment,
      },
      {
        colection1: "user",
        documents1: props.postUser,
        colection2: "posts",
        documents2: props.postID,
        colection3: "comments",
      }, true)
    setComment('')
  }

  useEffect(() => {
    // コメントの一覧表示
    const unsub = db.collection("user")
      .doc(props.postUser)
      .collection("posts")
      .doc(props.postID)
      .collection("comments")
      .orderBy('create_at')
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            photoUrl: doc.data().photoUrl,
            displayName: doc.data().displayName,
            comment: doc.data().comment,
            date: `${doc.data().create_at.toDate().getFullYear()}/${("00" + (doc.data().create_at.toDate().getMonth() + 1)).slice(-2)}/${("00" + doc.data().create_at.toDate().getDate()).slice(-2)}`
          }))
        )
      })
    return () => unsub();
  }, [])


  return (
    <>
      <div className={styles["comments-area"]}>
        <h2 className={styles["comments-area__title"]}>コメント</h2>

        {comments.map((c, index) => {
          return (
            <div key={index} className={styles["comments-area__comment"]}> <UserInfomation
              photoUrl={c.photoUrl}
              displayName={c.displayName}
              date={c.date}
            />
              <p className={styles["comments-area__sentence"]}>{c.comment}</p>
            </div>
          )
        })}

        <Textarea
          placeholder="記事にコメントを記載しましょう。"
          class="profile-text__introduction"
          id={"introduction"}
          value={comment}
          setValue={setComment}
          label="コメント" />

        <Button
          classDiv=""
          classButton="submit__button"
          value="送信"
          action={(e: React.ChangeEvent<HTMLInputElement>) => { onClickRegister(e) }}
        />
      </div>
    </>
  );
};

export default CommentsArea;
