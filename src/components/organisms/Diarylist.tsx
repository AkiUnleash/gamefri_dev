import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../common/firebase/firebase'
import styles from '../../assets/scss/organisms/diarylist.module.scss';
import Diarycard from '../Molecules/Diarycard'
import { selectUser } from "../../common/state/userSlice"
import Loader from '../atoms/Loader'
import InfiniteScroll from 'react-infinite-scroller';
import logo from '../../assets/images/logo_sm.svg'

type posts = {
  id: string,
  title: string,
  body: string,
  gametitle: string,
  nicecount: number,
  attachUrl: string,
  displayName: string,
  avatarUrl: string,
  link: string,
  create_at: string
}

const Diarylist: React.FC = () => {

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser);

  // hookでの状態管理
  const [post, setPost] = useState<posts[]>([])
  const [oldestId, setOldestId] = useState('')
  const [lastDate, setLastDate] = useState('')

  // 通知コレクションの最初の通知IDを取得
  const getLastID = async () => {
    const res = await db.collection('user')
      .doc(user.uid)
      .collection('timeline')
      .orderBy('create_at', 'asc')
      .limit(1)
      .get()

    setOldestId(res.docs[0].id)
  }

  const isPost = () => {
    if (post.length) {
      return oldestId !== post[post.length - 1].id
    } else {
      return false
    }
  }

  const getPosts: any = async () => {

    let fetchPosts = db.collection("user")
      .doc(user.uid)
      .collection("timeline")
      .orderBy('create_at', 'desc')

    if (lastDate) {
      if (oldestId === post[post.length - 1].id) {
        return
      } else {
        fetchPosts = fetchPosts.startAfter(lastDate)
      }
    }
    const res = await fetchPosts.limit(5).get()

    const datain = async (dataglobal: any) => {
      const timeline: any = []
      const postids: any[] = await res.docs.map((doc) => {
        return {
          userID: doc.data().userID,
          postID: doc.data().postID,
        }
      })

      await postids.forEach((p, index, array) => {
        db.collection('user')
          .doc(p.userID)
          .collection('posts')
          .doc(p.postID)
          .onSnapshot(doc => {
            if (doc.data()?.delete_at === undefined) {
              timeline.push({
                id: doc.id,
                title: doc.data()?.title,
                body: doc.data()?.body,
                gametitle: doc.data()?.gamename,
                link: '/' + doc.data()?.profileid + '/status/' + doc.id,
                nicecount: doc.data()?.nicecount,
                displayName: doc.data()?.nickname,
                avatarUrl: doc.data()?.avatarurl,
                attachUrl: doc.data()?.attachimage,
                create_at: `${doc.data()?.create_at.toDate().getFullYear()}/${("00" + (doc.data()?.create_at.toDate().getMonth() + 1)).slice(-2)}/${("00" + doc.data()?.create_at.toDate().getDate()).slice(-2)}`,
              })
            }
            if ((index + 1) === array.length) {
              setLastDate(res.docs[res.docs.length - 1].data().create_at)
              dataglobal(timeline)
            }
          })
      })

    }

    const dataglobal = (timeline: any) => {
      const posts: posts[] = timeline.reduce(
        (acc: posts[], doc: posts) => [
          ...acc,
          {
            id: doc.id,
            title: doc.title,
            body: doc.body,
            gametitle: doc.gametitle,
            nicecount: doc.nicecount,
            attachUrl: doc.attachUrl,
            displayName: doc.displayName,
            avatarUrl: doc.avatarUrl,
            link: doc.link,
            create_at: doc.create_at
          }
        ],
        post
      )
      setPost(posts)
    }

    datain(dataglobal)
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getLastID();
      getPosts();
    }

    return () => { isMounted = false }
  }, []);


  return <div>
    {
      <InfiniteScroll
        loadMore={getPosts}
        hasMore={isPost()}
        loader={<Loader key={0} />}
      >
        {
          post[0] !== undefined &&
          post.map((p, index) => (
            <Diarycard key={index}
              title={p.title}
              gametitle={p.gametitle}
              attach_photo={p.attachUrl}
              nicecount={p.nicecount}
              link={p.link}
              displayName={p.displayName}
              avatar_photo={p.avatarUrl}
              create_at={p.create_at}
            />
          ))}
      </InfiniteScroll>
    }

    {post[0] === undefined &&
      <div className={styles["guide"]}>
        <img className={styles["guide__logoimg"]} src={logo} alt="Site log" />
        <p className={styles["guide__title"]}>ゲムフレにようこそ！</p>
        <p className={styles["guide__discription"]}>上の検索ボタンからアカウントをフォローすると、日記が表示されます。</p>
        <p className={styles["guide__discription"]}>右下の＋ボタンから日記が投稿できます。</p>
      </div>}

  </div>
};

export default Diarylist;