import React, { useEffect, useState } from 'react';
import { db } from '../../common/firebase/firebase'
import Usercard from '../Molecules/Usercard'
import styles from '../../assets/scss/notification.module.scss'
import { selectUser } from '../../common/state/userSlice'
import { useSelector } from 'react-redux'

const NotificationArea: React.FC = () => {

  const [keyword, setKeyword] = useState('')
  const user = useSelector(selectUser)
  const [notification, setNotification] = useState([{
    nickname: "",
    profileid: "",
    avatarUrl: "",
    message: ""
  }])

  useEffect(() => {
    db.collection('user')
      .doc(user.uid)
      .collection('notifications')
      .orderBy('create_at', 'desc')
      .onSnapshot((snapshot) => {
        setNotification(
          snapshot.docs.map((doc) => ({
            nickname: doc.data().nickname,
            profileid: doc.data().profileid,
            avatarUrl: doc.data().avatarurl,
            message: doc.data().message
          }))
        )
      })
  }, [])

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["notification-select"]}>
          <div className={styles["notification-select__set"]}>通知</div>
        </div>

        {notification.map((n, index) =>
          <Usercard key={index}
            link={`/user/${n.profileid}`}
            photoUrl={n.avatarUrl}
            displayName={n.nickname}
            profileId={n.profileid}
            message={n.message}
            button={false} />
        )}
      </div>

    </>
  );
};

export default NotificationArea;