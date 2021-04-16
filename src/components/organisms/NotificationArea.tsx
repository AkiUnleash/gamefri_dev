import React, { useEffect, useState } from 'react';
import { db } from '../../common/firebase/firebase'
import Usercard from '../molecules/Usercard'
import styles from '../../assets/scss/organisms/notification.module.scss'
import { selectUser } from '../../common/state/userSlice'
import { useSelector } from 'react-redux'

const NotificationArea: React.FC = () => {

  // hookによる状態管理
  const [notification, setNotification] = useState([{
    nickname: "",
    profileid: "",
    avatarUrl: "",
    message: "",
    link: ""
  }])

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  useEffect(() => {
    const unSub = db.collection('user')
      .doc(user.uid)
      .collection('notifications')
      .orderBy('create_at', 'desc')
      .onSnapshot((snapshot) => {
        setNotification(
          snapshot.docs.map((doc) => ({
            nickname: doc.data().nickname,
            profileid: doc.data().profileid,
            avatarUrl: doc.data().avatarurl,
            message: doc.data().message,
            link: doc.data().link
          }))
        )
      })
    return () => unSub()
  }, [])

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["notification-select"]}>
          <div className={styles["notification-select__set"]}>通知</div>
        </div>
        {notification.map((n, index) =>
          <Usercard key={index}
            link={n.link}
            photoUrl={n.avatarUrl}
            displayName={n.nickname}
            profileId={n.profileid}
            message={n.message}
            button={false}
            id={""} />
        )}
      </div>
    </>
  );
};

export default NotificationArea;