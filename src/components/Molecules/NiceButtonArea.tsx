import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button'
import { dataAdd, dataUpdate, dataDelete } from "../../common/backend/model"
import { db } from '../../common/firebase/firebase'
import { nice, notification } from '../../common/utils/common-types'
import { selectUser } from "../../common/state/userSlice"
import { useSelector } from 'react-redux'

// このコンポーネントで扱う型宣言
type props = {
  documents1: string,
  documents2: string,
  documents3: string,
  nicecount: number,
  diaryTitle: string,
}

const NiceButtonArea: React.FC<props> = (props: props) => {

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  // hookでの状態管理
  const [action, setAction] = useState({
    style: "",
    value: 0,
    caption: "",
    function: () => { }
  })

  useEffect(() => {
    // ログインユーザしているユーザーから
    // ナイスされているかを確認し、表示するボタンを判断。
    const nicedoc =
      db.collection('user')
        .doc(props.documents1)
        .collection("posts")
        .doc(props.documents2)
        .collection("nices")
        .doc(props.documents3)
        .get()

    nicedoc.then((data) => {
      if (data.exists) {
        setAction({
          style: "nice__button--un_nice",
          value: props.nicecount,
          caption: `Nice! ${props.nicecount}`,
          function: () => { un_nice() }
        })
      } else {
        setAction({
          style: "nice__button--to_nice",
          value: props.nicecount,
          caption: `Nice! ${props.nicecount}`,
          function: () => { to_nice() }
        })
      }
    })
  }, [])

  // ナイスボタンのクリック時処理
  const to_nice = () => {
    const nice: nice = { userID: props.documents3 }

    // ナイスしたユーザーの登録
    dataAdd(
      nice, {
      colection1: "user",
      documents1: props.documents1,
      colection2: "posts",
      documents2: props.documents2,
      colection3: "nices",
      documents3: props.documents3
    }, true)

    // ナイスのドキュメント数を取得して反映
    db.doc(`user/${props.documents1}/posts/${props.documents2}`)
      .collection('nices').get()
      .then((doc) => {

        // 件数を加算
        dataUpdate({ nicecount: doc.size }, {
          colection1: "user",
          documents1: props.documents1,
          colection2: "posts",
          documents2: props.documents2,
        })

        // 解除ボタンに表示を変更
        setAction((n) => ({
          style: "nice__button--un_nice",
          value: doc.size,
          caption: `Nice! ${doc.size}`,
          function: () => { un_nice() }
        }))
      })

    // 通知データの登録
    const notification: notification = {
      avatarurl: user.photoUrl,
      nickname: user.displayName,
      profileid: user.profileID,
      message: `日記「${props.diaryTitle}」にナイスされました。`,
      link: `/home`
    }
    dataAdd(notification,
      {
        colection1: "user",
        documents1: props.documents1,
        colection2: "notifications",
      },
      true)

  }

  // ナイス解除ボタンのクリック時処理
  const un_nice = () => {

    // ナイスしたログインユーザーデータを削除
    dataDelete(
      {
        colection1: "user",
        documents1: props.documents1,
        colection2: "posts",
        documents2: props.documents2,
        colection3: "nices",
        documents3: props.documents3
      },
    )

    // ナイスのドキュメント数を取得して反映
    db.doc(`user/${props.documents1}/posts/${props.documents2}`)
      .collection('nices').get()
      .then((doc) => {

        // 件数を加算
        dataUpdate({ nicecount: doc.size }, {
          colection1: "user",
          documents1: props.documents1,
          colection2: "posts",
          documents2: props.documents2,
        })

        // ナイスボタンに表示を変更
        setAction((n) => ({
          style: "nice__button--to_nice",
          value: doc.size,
          caption: `Nice! ${doc.size}`,
          function: () => { to_nice() }
        }))
      })
  }

  return (
    <>
      <Button
        classDiv="nice__div"
        classButton={action.style}
        value={action.caption}
        action={() => {
          action.function()
        }}
      />
    </>
  );
};

export default NiceButtonArea;
