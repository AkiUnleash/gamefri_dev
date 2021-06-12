import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { browserHistory } from "../../history"
import img_cover_sample from '../../assets/images/profile/cover-sample.png'
import img_avatar_sample from '../../assets/images/profile/avatar.png'
import styles from '../../assets/scss/organisms/profiledata.module.scss';
import { selectUser } from "../../common/state/userSlice"
import { dataAdd, dataUpdate, dataDelete } from "../../common/backend/model"
import { follow, notification } from '../../common/utils/common-types'
import { db } from '../../common/firebase/firebase';

// hookによる状態管理
type props = {
  id: string,
  avatarimage: string,
  coverimage: string,
  followercount: number,
  nickname: string,
  introduction: string,
  gender: string,
  birthday: string,
  playgame: string,
  gametime: string
}

const Profiledata: React.FC<props> = (props: props) => {

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  // hookによる状態管理
  const [follower, setFollower] = useState(props.followercount)
  const [action, setAction] = useState({
    style: "",
    value: "",
    function: () => { }
  })

  // フォローボタンクリック時の処理
  const to_follow = () => {

    // フォローした結果のデータを送信
    const follow: follow = { userID: props.id }
    dataAdd(follow,
      {
        colection1: "user",
        documents1: user.uid,
        colection2: "followings",
        documents2: props.id
      },
      true)

    const follower: follow = { userID: props.id }
    dataAdd(follower,
      {
        colection1: "user",
        documents1: props.id,
        colection2: "followers",
        documents2: user.uid,
      },
      true)

    // 通知データの送信
    const notification: notification = {
      avatarurl: user.photoUrl,
      nickname: user.displayName,
      profileid: user.profileID,
      message: "フォローされました。",
      link: `/user/${user.profileID}`
    }
    dataAdd(notification,
      {
        colection1: "user",
        documents1: props.id,
        colection2: "notifications",
      },
      true)

    // ナイスのドキュメント数を取得して反映
    db.doc(`user/${user.uid}`)
      .collection('followings').get()
      .then((doc) => {
        // 件数を加算
        dataUpdate({ followercount: doc.size }, {
          colection1: "user",
          documents1: props.id,
        })
        setFollower(doc.size)
      })

    // ボタン表示の変更
    setAction({
      style: "profiledata-follow__button--un-follow",
      value: "フォローを解除",
      function: () => { un_follow() }
    })

  }

  // フォロワー解除ボタンのクリック時処理
  const un_follow = () => {

    // フォローしていたデータを削除
    dataDelete(
      {
        colection1: "user",
        documents1: user.uid,
        colection2: "followings",
        documents2: props.id
      }
    )

    dataDelete(
      {
        colection1: "user",
        documents1: props.id,
        colection2: "followers",
        documents2: user.uid,
      }
    )

    // ナイスのドキュメント数を取得して反映
    db.doc(`user/${user.uid}`)
      .collection('followings').get()
      .then((doc) => {
        // 件数を加算
        dataUpdate({ followercount: doc.size }, {
          colection1: "user",
          documents1: props.id,
        })
        setFollower(doc.size)
      })

    // ボタン表示の変更
    setAction({
      style: "profiledata-follow__button--to-follow",
      value: "フォローする",
      function: () => { to_follow() }
    })
  }

  useEffect(() => {
    let isMounted = true;
    // 自分のプロフィールであれば、編集画面の表示
    // 自部員以外のプロフィールであれば、フォロー及び解除ボタンの表示
    if (isMounted) {
      console.log("user: " + user.uid, "props: " + props.id);

      if (user.uid === props.id) {
        setAction({
          style: "profiledata-follow__button--profileedit",
          value: "プロファイルの編集",
          function: () => {
            browserHistory.push("/profile")
          }
        })
      } else {
        const doc =
          db.collection('user')
            .doc(user.uid)
            .collection("followings")
            .doc(props.id)
            .get()
        doc.then((data) => {
          if (data.exists) {
            setAction({
              style: "profiledata-follow__button--un-follow",
              value: "フォローを解除",
              function: () => { un_follow() }
            })
          } else {
            setAction({
              style: "profiledata-follow__button--to-follow",
              value: "フォローする",
              function: () => { to_follow() }
            })
          }
        })
      }
    }
    return () => { isMounted = false }
  }, [])

  return (
    <>
      <div className={styles["profiledata-img"]}>
        <img className={styles["profiledata-img__cover-photo"]} id="img_cover" src={props.coverimage ? props.coverimage : img_cover_sample} alt="cover photos" />
        <img className={styles["profiledata-img__avatar-photo"]} id="img_avatar" src={props.avatarimage ? props.avatarimage : img_avatar_sample} alt="avatar photos" />
      </div>

      <div className={styles["profiledata-follow"]}>
        <div>
          <div className={styles["profiledata-follow__title"]}>フォロワー</div>
          <span className={styles["profiledata-follow__value"]}>{follower}人</span>
        </div>
        <button className={styles[action.style]}
          onClick={action.function}>{action.value}</button>
      </div>

      <div className={styles["profiledata-data"]}>
        <div className={styles["profiledata-data__one-line"]}>
          <div className={styles["profiledata-data__title"]}>ニックネーム</div>
          <div className={styles["profiledata-data__value"]}>{props.nickname}</div>
        </div>
        <div className={styles["profiledata-data__one-line"]}>
          <div className={styles["profiledata-data__title"]}>自己紹介</div>
          <p className={styles["profiledata-data__value"]}>{props.introduction}</p>
        </div>
        <div className={styles["profiledata-data__side-by-side"]}>
          <div>
            <div className={styles["profiledata-data__title"]}>性別</div>
            <div className={styles["profiledata-data__value"]}>{props.gender}</div>
          </div>
          {/* 生年月日はデータとして残すかどうか検討中のため非表示 */}
          {/* <div className={styles["profiledata-data__side-by-side--right"]}>
            <div className={styles["profiledata-data__title"]}>生年月日</div>
            <div className={styles["profiledata-data__value"]}>{props.birthday}</div>
          </div> */}
        </div>
        <div className={styles["profiledata-data__one-line"]}>
          <div className={styles["profiledata-data__title"]}>プレイしているゲーム</div>
          <div className={styles["profiledata-data__value"]}>{props.playgame}</div>
        </div>
        <div className={styles["profiledata-data__one-line"]}>
          <div className={styles["profiledata-data__title"]}>プレイしている時間帯</div>
          <div className={styles["profiledata-data__value"]}>{props.gametime}</div>
        </div>
      </div>
    </>
  );
};

export default Profiledata;
