import React, { useEffect, useState } from 'react';
import { db } from '../../common/firebase/firebase'
import Usercard from '../molecules/Usercard'
import styles from '../../assets/scss/organisms/notification.module.scss'
import { selectUser } from '../../common/state/userSlice'
import { useSelector } from 'react-redux'
import Loader from '../atoms/Loader'
import InfiniteScroll from 'react-infinite-scroller';

type notification = {
  id: "",
  nickname: "",
  profileid: "",
  avatarUrl: "",
  message: "",
  link: ""
}

const NotificationArea: React.FC = () => {

  // hookによる状態管理
  const [notification, setNotification] = useState<notification[]>([])
  const [oldestId, setOldestId] = useState('')
  const [lastDate, setLastDate] = useState('')

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  // 通知コレクションの最初の通知IDを取得
  const getLastID = async () => {
    const res = await
      db.collection('user')
        .doc(user.uid)
        .collection('notifications')
        .orderBy('create_at', 'asc')
        .limit(1)
        .get()

    setOldestId(res.docs[0].id)
  }

  const isNotification = () => {
    if (notification.length) {
      return oldestId !== notification[notification.length - 1].id
    } else {
      return false
    }
  }

  const getNotifications: any = async () => {

    let fetchnotifications = db.collection('user')
      .doc(user.uid)
      .collection('notifications')
      .orderBy('create_at', 'desc')

    // データ更新開始地点をcreate_atをキーに特定
    if (lastDate) {
      if (oldestId === notification[notification.length - 1].id) {
        return
      }
      fetchnotifications = fetchnotifications.startAfter(lastDate)
    }
    const res = await fetchnotifications.limit(10).get()

    // 通知データを保管(現在表示されているデータに追加)
    const notifications: any[] = res.docs.reduce(
      (acc: any, doc: any) => [
        ...acc,
        {
          id: doc.id,
          nickname: doc.data().nickname,
          profileid: doc.data().profileid,
          avatarUrl: doc.data().avatarurl,
          message: doc.data().message,
          link: doc.data().link
        },
      ],
      notification
    )
    setNotification(notifications)

    // 最後の日付データを取得
    setLastDate(res.docs[res.docs.length - 1].data().create_at)

  }

  useEffect(() => {
    // 通知コレクションの最初の通知IDを取得
    getLastID()
    getNotifications()

    return () => {
      getLastID()
      getNotifications()
    }
  }, [])

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["notification-select"]}>
          <div className={styles["notification-select__set"]}>通知</div>
        </div>
        {/* データの最下部を検知し、表示する。 */}
        <InfiniteScroll
          loadMore={getNotifications}
          hasMore={isNotification()}
          loader={<Loader key={0} />}
        >
          {notification.map((n, index) =>
            <Usercard key={n.id}
              link={n.link}
              photoUrl={n.avatarUrl}
              displayName={n.nickname}
              profileId={n.profileid}
              message={n.message}
              button={false}
              id={""} />
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default NotificationArea;