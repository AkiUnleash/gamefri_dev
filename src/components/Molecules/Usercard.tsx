import React, { useState } from 'react';
import styles from '../../assets/scss/Molecules/usercard.module.scss'
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation'
import { follow, notification } from '../../common/utils/common-types'
import { dataAdd, dataUpdate, dataDelete } from "../../common/backend/model"
import { selectUser } from "../../common/state/userSlice"
import { useSelector } from 'react-redux'
import { db } from '../../common/firebase/firebase';
import * as DataInterface from '../../common/backend/model'

// このコンポーネントで扱う型宣言
type props = {
  link: string,
  photoUrl: string,
  displayName: string,
  profileId: string,
  message: string,
  button: boolean
  id: string,
}

const Usercard: React.FC<props> = (props: props) => {

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  // hookの初期値を保存
  let actionInitialize = {
    style: "",
    value: "",
    function: () => { }
  }
  // フォローかフォロー解除か判定
  if (user.follower.includes(props.id)) {
    actionInitialize.style = "follow__button--done"
    actionInitialize.value = "解除"
    actionInitialize.function = () => un_follow()
  } else {
    actionInitialize.style = "follow__button--yet"
    actionInitialize.value = "フォロー"
    actionInitialize.function = () => to_follow()
  }

  // hookでの状態管理
  const [action, setAction] = useState(actionInitialize)

  // フォローボタンをクリックした時の処理
  const to_follow = () => {

    // フォローデータの挿入
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

    // 通知データの挿入
    const notification: notification = {
      avatarurl: props.photoUrl,
      nickname: props.displayName,
      profileid: props.profileId,
      link: `/user/${props.profileId}`,
      message: "フォローされました。",
    }
    dataAdd(notification,
      {
        colection1: "user",
        documents1: props.id,
        colection2: "notifications",
      },
      true)

    // ナイスのドキュメント数を取得して反映
    db.doc(`user/${props.id}`)
      .collection('followings').get()
      .then((doc) => {
        // 件数を加算
        dataUpdate({ followercount: doc.size }, {
          colection1: "user",
          documents1: props.id,
        })
      })

    // ３件のみポストをタイムラインにコピー
    db.collection('user')
      .doc(props.id)
      .collection('posts')
      .limit(3)
      .onSnapshot(doc => {
        doc.forEach((doc) => {
          DataInterface.dataAdd(
            {
              userID: props.id,
              postID: doc.id
            },
            {
              colection1: 'user',
              documents1: user.uid,
              colection2: "timeline",
              documents2: doc.id,
            },
            true
          )
          doc.data()
        })
      })

    // フォローボタンを解除に変更
    setAction({
      style: "follow__button--done",
      value: "解除",
      function: () => { un_follow() }
    })
  }

  // フォロー解除クリック時処理
  const un_follow = () => {

    // フォローからログインユーザーの解除
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
    db.doc(`user/${props.id}`)
      .collection('followings').get()
      .then((doc) => {
        // 件数を加算
        dataUpdate({ followercount: doc.size }, {
          colection1: "user",
          documents1: props.id,
        })
      })
    // フォローボタンに変更
    setAction({
      style: "follow__button--yet",
      value: "フォロー",
      function: () => { to_follow() }
    })
  }

  return (
    <>
      <div className={styles["user-card"]}>
        <a href={props.link}>
          <div className={styles["user-card__first-line"]}>
            <div className={styles["user-card__first-line--infomation"]}>
              <UserInfomation
                photoUrl={props.photoUrl}
                displayName={props.displayName}
                date={props.profileId}
              />
            </div>
          </div>
          <div className="user-card__introduction"> {props.message} </div>
        </a>
        <div className={styles["user-card__first-line--follow"]}>
          {props.button &&
            <Button
              classDiv=""
              classButton={action.style}
              value={action.value}
              action={action.function}
            />
          }
        </div>
      </div>
    </>
  );
};

export default Usercard;
