import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../common/firebase/firebase'
import Diarycard from '../molecules/Diarycard'
import { selectUser } from "../../common/state/userSlice"
import Loader from '../atoms/Loader'
import InfiniteScroll from 'react-infinite-scroller';

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
    console.log(post.length);

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
    const res = await fetchPosts.limit(3).get()
    setLastDate(res.docs[res.docs.length - 1].data().create_at)

    const datain = async (dataglobal: any) => {
      const timeline: any = []
      await res.docs.forEach((doc) => {
        db.collection('user')
          .doc(doc.data().userID)
          .collection('posts')
          .doc(doc.data().postID)
          .onSnapshot(doc => {
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
          })
      })
      await dataglobal(timeline)
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
    getLastID();
    getPosts();

    return () => {
      getLastID();
      getPosts();
    }
  }, []);


  return <div>
    {
      <InfiniteScroll
        loadMore={getPosts}
        hasMore={isPost()}
        loader={<Loader key={0} />}
      >
        {post.map((p, index) => (
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
  </div>
};

export default Diarylist;