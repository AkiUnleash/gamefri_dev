import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { browserHistory } from "../../history"
// assets
import img_cover_sample from '../../assets/images/profile/cover-sample.png'
import img_avatar_sample from '../../assets/images/profile/avatar.png'
import styles from '../../assets/scss/profiledata.module.scss';
// common
import { selectUser } from "../../common/state/userSlice"
import { dataAdd, dataDelete } from "../../common/backend/model"
import { follow } from '../../common/utils/common-types'
import { db } from '../../common/firebase/firebase';

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
  const user = useSelector(selectUser)

  const [action, setAction] = useState({
    style: "",
    value: "",
    function: () => { }
  })

  const to_follow = () => {
    const follow: follow = { userID: props.id }
    dataAdd(follow, "user", user.uid, true, "followings", props.id)
    setAction({
      style: "profiledata-follow__button--un-follow",
      value: "フォローを解除",
      function: () => { un_follow() }
    })
  }

  const un_follow = () => {
    dataDelete("user", user.uid, "followings", props.id)
    setAction({
      style: "profiledata-follow__button--to-follow",
      value: "フォローする",
      function: () => { to_follow() }
    })
  }

  useEffect(() => {
    // 自分のプロフィールであれば、編集画面の表示
    if (user.uid === props.id) {
      setAction({
        style: "profiledata-follow__button--profileedit",
        value: "プロファイルの編集",
        function: () => {
          browserHistory.push("/profile")
        }
      })
    } else {
      const doc = db.collection('user').doc(user.uid).collection("followings").doc(props.id).get()
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
          <span className={styles["profiledata-follow__value"]}>12000人</span>
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
          <div className={styles["profiledata-data__side-by-side--right"]}>
            <div className={styles["profiledata-data__title"]}>生年月日</div>
            <div className={styles["profiledata-data__value"]}>{props.birthday}</div>
          </div>
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
