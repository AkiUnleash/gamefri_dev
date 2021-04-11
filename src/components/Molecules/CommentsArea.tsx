import React, { useState, useEffect } from 'react';
import styles from '../../assets/scss/diarydisplay.module.scss';
import Textarea from '../atoms/Textarea'
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation';
import { dataAdd } from "../../common/backend/model"
import { db } from '../../common/firebase/firebase'

type props = {
  postUser: string,
  postID: string,
  commentUserID: string,
  commentUserPhotoURL: string,
  commentUserDisplayName: string
}
type comments = [
  {
    photoUrl: string,
    displayName: string,
    date: string,
    comment: string,
  }]


const CommentsArea: React.FC<props> = (props: props) => {

  const [comments, setComments] = useState([{
    photoUrl: "",
    displayName: "",
    date: "",
    comment: "",
  }])

  const [comment, setComment] = useState('')

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
            date: "2020/3/12"
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
