import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from '../../common/firebase/firebase'
import { selectUser } from "../../common/state/userSlice"
import styles from '../../assets/scss/diarydisplay.module.scss';
import Textarea from '../atoms/Textarea'
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation';
import { dataAdd, dataDelete } from "../../common/backend/model"
import { nice } from '../../common/utils/common-types'


const Diarydisplay: React.FC = () => {
  const user = useSelector(selectUser);

  const { profileid, postid } = useParams<{ profileid?: string, postid?: string }>()

  const [action, setAction] = useState({
    style: "",
    value: "",
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

  const [nicecount, setNicecount] = useState(0)


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
                postUserId: doc.id,
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
                    value: `Nice! ${doc.data()?.nicecount}`,
                    function: () => { un_nice() }
                  })
                } else {
                  setAction({
                    style: "nice__button--to_nice",
                    value: `Nice! ${doc.data()?.nicecount}`,
                    function: () => { to_nice() }
                  })
                }
                setNicecount(doc.data()?.nicecount)

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

    setAction({
      style: "nice__button--un_nice",
      value: "Nice! " + nicecount,
      function: () => { un_nice() }
    })
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
    setAction({
      style: "nice__button--to_nice",
      value: "Nice! " + nicecount,
      function: () => { to_nice() }
    })
  }

  return <>
    <div className={styles["container"]}>

      <Button
        classDiv="nice__div"
        classButton={action.style}
        value={action.value}
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

      <div className={styles["comments-area"]}>
        <h2 className={styles["comments-area__title"]}>コメント</h2>
        <div className={styles["comments-area__comment"]}>
          <UserInfomation
            photoUrl={user.photoUrl}
            displayName={user.displayName}
            date="2021/3/28"
          />
          <p className={styles["comments-area__sentence"]}>学生の友人と遊ぶのはストレス解消になりますよね！ 私も気持ち、すごくわかります。</p>
        </div>
      </div>

      <Textarea
        placeholder="記事にコメントを記載しましょう。"
        class="profile-text__introduction"
        id={"introduction"}
        value={""}
        setValue={() => { }}
        label="コメント" />

      <Button
        classDiv=""
        classButton="submit__button"
        value="送信"
        action={() => {
          console.log('test');
        }}
      />

    </div>
  </>
};

export default Diarydisplay;