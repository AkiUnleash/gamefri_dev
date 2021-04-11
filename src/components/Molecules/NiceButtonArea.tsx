import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button'
import { dataAdd, dataUpdate, dataDelete } from "../../common/backend/model"
import { db } from '../../common/firebase/firebase'
import { nice, notification } from '../../common/utils/common-types'
import { selectUser } from "../../common/state/userSlice"
import { useSelector } from 'react-redux'

type props = {
  documents1: string,
  documents2: string,
  documents3: string,
  nicecount: number,
  diaryTitle: string,
}

const NiceButtonArea: React.FC<props> = (props: props) => {

  const user = useSelector(selectUser)

  let niceCount = props.nicecount
  const [action, setAction] = useState({
    style: "",
    value: 0,
    caption: "",
    function: () => { }
  })

  useEffect(() => {
    // niceボタン
    const nicedoc =
      db.collection('user')
        .doc(props.documents1) // doc.id
        .collection("posts")
        .doc(props.documents2) // postid
        .collection("nices")
        .doc(props.documents3) // user.uid
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

  const to_nice = () => {
    const nice: nice = { userID: props.documents3 }

    dataAdd(
      nice, {
      colection1: "user",
      documents1: props.documents1,
      colection2: "posts",
      documents2: props.documents2,
      colection3: "nices",
      documents3: props.documents3
    }, true)

    setAction((n) => ({
      style: "nice__button--un_nice",
      value: n.value + 1,
      caption: "Nice! " + (n.value + 1),
      function: () => { un_nice() }
    }))

    // 通知
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

    // ナイス
    dataUpdate({ nicecount: action.value }, {
      colection1: "user",
      documents1: props.documents1,
      colection2: "posts",
      documents2: props.documents2,
    })

    dataUpdate({ nicecount: ++niceCount }, {
      colection1: "user",
      documents1: props.documents1,
      colection2: "posts",
      documents2: props.documents2,
    })
  }

  const un_nice = () => {
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
    setAction((n) => ({
      style: "nice__button--to_nice",
      value: n.value - 1,
      caption: "Nice! " + (n.value - 1),
      function: () => { to_nice() }
    }))

    dataUpdate({ nicecount: --niceCount }, {
      colection1: "user",
      documents1: props.documents1,
      colection2: "posts",
      documents2: props.documents2,
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
