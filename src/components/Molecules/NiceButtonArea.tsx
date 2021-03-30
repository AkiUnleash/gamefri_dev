import React, { useState, useEffect } from 'react';
import styles from '../../assets/scss/diarydisplay.module.scss';
import Textarea from '../atoms/Textarea'
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation';
import { dataAdd } from "../../common/backend/model"
import { db } from '../../common/firebase/firebase'

const NiceButtonArea: React.FC<props> = (props: props) => {

  useEffect(() => {
    const unsub = db.collection("user")
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
