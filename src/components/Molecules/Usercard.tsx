import React, { useState } from 'react';
import styles from '../../assets/scss/search.module.scss'
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation'
import { follow, notification } from '../../common/utils/common-types'
import { dataAdd, dataDelete } from "../../common/backend/model"
import { selectUser } from "../../common/state/userSlice"
import { useSelector } from 'react-redux'

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

  const user = useSelector(selectUser)

  let actionInitialize = {
    style: "",
    value: "",
    function: () => { }
  }

  if (user.follower.includes(props.id)) {
    actionInitialize.style = "follow__button--done"
    actionInitialize.value = "解除"
    actionInitialize.function = () => un_follow()
  } else {
    actionInitialize.style = "follow__button--yet"
    actionInitialize.value = "フォロー"
    actionInitialize.function = () => to_follow()
  }

  const [action, setAction] = useState(actionInitialize)

  const to_follow = () => {
    console.log({
      colection1: "user",
      documents1: user.uid.trim(),
      colection2: "followings",
      documents2: props.id.trim()
    }
    );

    const follow: follow = { userID: props.id.trim() }
    dataAdd(follow,
      {
        colection1: "user",
        documents1: user.uid.trim(),
        colection2: "followings",
        documents2: props.id.trim()
      },
      true)

    const notification: notification = {
      avatarurl: user.photoUrl,
      nickname: user.displayName,
      profileid: user.profileID,
      link: `/user/${user.profileID}`,
      message: "フォローされました。",
    }
    dataAdd(notification,
      {
        colection1: "user",
        documents1: props.id,
        colection2: "notifications",
      },
      true)

    setAction({
      style: "follow__button--done",
      value: "解除",
      function: () => { un_follow() }
    })
  }

  const un_follow = () => {
    dataDelete(
      {
        colection1: "user",
        documents1: user.uid,
        colection2: "followings",
        documents2: props.id
      }
    )
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
