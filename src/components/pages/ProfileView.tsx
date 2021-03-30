import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
// Component
import Header from '../organisms/Header_in';
import Profiledata from '../organisms/Profiledata';
import Diarycard from '../Molecules/Diarycard'
// state
import { selectUser } from "../../common/state/userSlice"
// assets
import styles from '../../assets/scss/profiledata.module.scss';
// common
import { loginChack, authenticatedChack, profileDocumentExistence } from "../../common/backend/model"
import { db } from '../../common/firebase/firebase'


const ProfileView: React.FC = () => {
  const user = useSelector(selectUser)
  const [profile, setProfile] = useState({
    id: "",
    avatarimage: "",
    coverimage: "",
    followercount: 0,
    nickname: "",
    introduction: "",
    gender: "",
    birthday: "",
    playgame: "",
    gametime: "",
  })

  const [post, setPost] = useState([
    {
      id: "",
      title: "",
      body: "",
      gametitle: "",
      likecount: 0,
      attachUrl: "",
      displayName: "",
      avatarUrl: "",
      link: "",
      create_at: ""
    },

  ])
  const { profileid } = useParams<{ profileid?: string }>()
  const [userid, setUserid] = useState('')

  useEffect(() => {
    // ログイン済みの確認
    loginChack();
    // メール認証確認
    authenticatedChack();
    // プロフィール入力有無確認
    profileDocumentExistence();
    // ユーザーデータの取得
    let targetprofile = {
      id: "",
      displayName: "",
      avatarimage: ""
    }
    db.collection("user")
      .where('profileid', '==', profileid)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          targetprofile.id = doc.id
          targetprofile.displayName = doc.data().nickname
          targetprofile.avatarimage = doc.data().avatarurl
          setProfile({
            id: doc.id,
            avatarimage: doc.data().avatarurl,
            coverimage: doc.data().coverurl,
            followercount: 0,
            nickname: doc.data().nickname,
            introduction: doc.data().introduction,
            gender: doc.data().gender,
            birthday: "---",
            playgame: doc.data().playgame,
            gametime: doc.data().timestart + "〜" + doc.data().timeend,
          })
        }
        )
        // ユーザーの日記を取得
        db.collection("user")
          .doc(targetprofile.id)
          .collection("posts")
          .orderBy("create_at", "desc")
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => (
              setPost(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  title: doc.data().title,
                  body: doc.data().body,
                  gametitle: doc.data().gametitle,
                  link: '/' + profileid + '/status/' + doc.id,
                  likecount: 0,
                  displayName: targetprofile.displayName,
                  avatarUrl: targetprofile.avatarimage,
                  attachUrl: doc.data().attachimage,
                  create_at: `${doc.data().create_at.toDate().getFullYear()}/${("00" + (doc.data().create_at.toDate().getMonth() + 1)).slice(-2)}/${("00" + doc.data().create_at.toDate().getDate()).slice(-2)}`,
                }))
              )
            ))
          }
          );
      })
  }, []);

  return (
    <>
      <Header />
      {user.uid ?
        <Profiledata
          id={profile.id}
          avatarimage={profile.avatarimage}
          coverimage={profile.coverimage}
          followercount={profile.followercount}
          nickname={profile.nickname}
          introduction={profile.introduction}
          gender={profile.gender}
          birthday={profile.birthday}
          playgame={profile.playgame}
          gametime={profile.gametime}
        />
        : ""}
      <div className={styles["profiledata-diary"]}>
        {
          post[0]?.id && (
            <>
              {post.map((p, index) => (
                <Diarycard key={index}
                  title={p.title}
                  gametitle={p.gametitle}
                  attach_photo={p.attachUrl}
                  likecount={p.likecount}
                  link={p.link}
                  displayName={p.displayName}
                  avatar_photo={p.avatarUrl}
                  create_at={p.create_at}
                />
              ))}
            </>
          )
        }
      </div>

    </>
  );
};

export default ProfileView;