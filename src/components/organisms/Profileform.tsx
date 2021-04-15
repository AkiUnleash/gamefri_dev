import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, updateUserProfile } from '../../common/state/userSlice'
import { browserHistory } from "../../history"
import styles from '../../assets/scss/organisms/profileedit.module.scss';
import mui from '../../assets/css/mui.module.css'
import img_photo_select from '../../assets/images/profile/photo-select.svg'
import img_photo_clear from '../../assets/images/profile/photo-clear.svg'
import img_cover_sample from '../../assets/images/profile/cover-sample.png'
import img_avatar_sample from '../../assets/images/profile/avatar.png'
import Textfield from '../atoms/Textfield'
import Textarea from '../atoms/Textarea'
import Radio from '../atoms/Radio'
import * as DataInterface from '../../common/backend/model'
import { db } from '../../common/firebase/firebase'
import { notification } from '../../common/utils/common-types'
import Errormessage from '../atoms/Errormessage'
import { isProfileid, isNickname } from '../../common/validation/validation'

const Profileform: React.FC = () => {

  // Reduxにて状態管理のデータを取得
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  // hookによる状態管理
  const [profileid, setProfileID] = useState("")
  const [nickname, setNickname] = useState("")
  const [introduction, setIntroduction] = useState("")
  const [gender, setGender] = useState("")
  const [playgame, setPlaygame] = useState("")
  const [timestart, setTimestart] = useState("")
  const [timeend, setTimeend] = useState("")
  const [cover, setCover] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [firstcover, setFirstCover] = useState("")
  const [firstavatar, setFirstAvatar] = useState("")
  const [error, setError] = useState<string | undefined>("")

  // 生年月日はデータを取得するか検討中のため非表示
  // const [year, setYear] = useState<string | "-">("-")
  // const [month, setMonth] = useState<string | "-">("-")
  // const [day, setDay] = useState<string | "-">("-")
  // const yearDataSource = [...Array(new Date().getFullYear() - 1900).keys()].map(i => (i + 1900).toString() + '年').reverse()
  // yearDataSource.unshift('-')
  // const monthDataSource = [...Array(12).keys()].map(i => (i + 1).toString() + '月')
  // monthDataSource.unshift('-')
  // const dayDataSource = [...Array(31).keys()].map(i => (i + 1).toString() + '日')
  // dayDataSource.unshift('-')

  // 画像選択
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>, genre: string) => {

    // 画像が選択されているかの確認
    if (e.target.files === null) { return; }
    const file = e.target.files[0];
    if (file === null) { return; }

    // アバターorカバーを判断。
    if (genre === "avatar") {
      setAvatar(e.target.files[0])
    } else {
      setCover(e.target.files[0])
    }

    // 選択した画像の表示
    let imgTag = document.getElementById("img_" + genre) as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
    }

  }

  // 画像削除ボタンをクリックしたときの処理
  const onChangeImageclear = (genre: string) => {
    // アバターorカバーを判断。
    const imgTag = document.getElementById("img_" + genre) as HTMLImageElement;
    switch (genre) {
      case 'avatar':
        setAvatar(null)
        setFirstAvatar('')
        imgTag.src = img_avatar_sample
        break;
      case 'cover':
        setCover(null)
        setFirstCover('')
        imgTag.src = img_cover_sample
        break;
    }
  }

  // 登録ボタンクリック時の処理
  const onRegisterClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // POST停止
    e.preventDefault();

    // バリデーション
    let ErrorData = isProfileid(profileid)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isNickname(nickname)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    // アバター画像の選択有無の確認
    // あればイメージをFirestrageに保存し、URLをFirestoreに保存。
    let avatarurl = ''
    if (avatar) {
      avatarurl = await DataInterface.imageAdd('avatar', avatar.name, avatar)
    } else {
      firstavatar === undefined ? avatarurl = "" : avatarurl = firstavatar
    }

    // カバー画像の選択有無の確認
    // あればイメージをFirestrageに保存し、URLをFirestoreに保存。
    let coverurl = ''
    if (cover) {
      coverurl = await DataInterface.imageAdd('cover', cover.name, cover)
    } else {
      firstcover === undefined ? coverurl = "" : coverurl = firstcover
    }

    // Firebase authenticationに名称等の情報を送信
    DataInterface.updateProfile(nickname, avatarurl)
    dispatch(
      updateUserProfile({
        displayName: nickname,
        photoUrl: avatarurl,
      })
    );

    console.log(
      {
        profileid: profileid,
        nickname: nickname,
        introduction: introduction,
        gender: gender,
        playgame: playgame,
        timestart: timestart,
        timeend: timeend,
        avatarurl: avatarurl,
        coverurl: coverurl,
        uid: user.uid
      },
    )
    // Firestoreにユーザー情報を保存
    DataInterface.dataAdd(
      {
        profileid: profileid,
        nickname: nickname,
        introduction: introduction,
        gender: gender,
        playgame: playgame,
        timestart: timestart,
        timeend: timeend,
        avatarurl: avatarurl,
        coverurl: coverurl,
        uid: user.uid
      },
      {
        colection1: 'user',
        documents1: user.uid,
      },
      true
    )

    // Firestoreに通知書データを表示
    const notification: notification = {
      avatarurl: avatarurl,
      nickname: nickname,
      profileid: profileid,
      message: "プロフィールを変更しました。",
      link: `user/${profileid}`
    }
    DataInterface.dataAdd(notification,
      {
        colection1: "user",
        documents1: user.uid,
        colection2: "notifications",
      },
      true)

    // Homeへ画面遷移
    browserHistory.push("/home")

  }

  useEffect(() => {
    const unsub = db.collection("user")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        setNickname(snapshot.data()?.nickname)
        setProfileID(snapshot.data()?.profileid)
        setIntroduction(snapshot.data()?.introduction ? snapshot.data()?.introduction : introduction)
        setGender(snapshot.data()?.gender ? snapshot.data()?.gender : gender)
        setPlaygame(snapshot.data()?.playgame ? snapshot.data()?.playgame : playgame)
        setTimestart(snapshot.data()?.timestart ? snapshot.data()?.timestart : timestart)
        setTimeend(snapshot.data()?.timeend ? snapshot.data()?.timeend : timeend)
        setFirstAvatar(snapshot.data()?.avatarurl)
        setFirstCover(snapshot.data()?.coverurl)
      })
    return () => unsub()
  }, [])

  return (
    <>
      <div className={styles["profile-img"]}>

        <img className={styles["profile-img__cover-photo"]} id="img_cover" src={firstcover || img_cover_sample} alt="cover photos" />

        <label>
          <img className={cover || firstcover ? styles["profile-img__cover-photo--select"] : styles["profile-img__cover-photo--select_none"]} src={img_photo_select} alt="cover select" />
          <input type="file" className={styles["profile-img__filesend"]} onChange={(e) => onChangeImage(e, "cover")} />
        </label>

        {cover || firstcover ? (
          <label>
            <img className={styles["profile-img__cover-photo--clear"]} src={img_photo_clear} alt="cover clear" />
            <button type="button" className={styles["profile-img__filesend"]} onClick={(e) => onChangeImageclear("cover")} />
          </label>
        ) : ""}

        <img className={styles["profile-img__avatar-photo"]} id="img_avatar" src={firstavatar || img_avatar_sample} alt="avatar photos" />
        <label>
          <img className={styles["profile-img__avatar-photo--select"]} src={img_photo_select} alt="avatar select" />
          <input type="file" className={styles["profile-img__filesend"]} onChange={(e) => onChangeImage(e, "avatar")} />
        </label>

        {avatar || firstavatar ? (
          <label>
            <img className={styles["profile-img__avatar-photo--clear"]} src={img_photo_clear} alt="cover clear" />
            <input type="button" className={styles["profile-img__filesend"]} onClick={(e) => onChangeImageclear("avatar")} />
          </label>
        ) : ""}

      </div>
      <div className={styles["profile-text"]}>
        <form className={mui["mui-form"]}>
          <div className={styles["profile-text__title"]}>
            <legend className={styles["profile-text__legend"]}>プロフィール編集</legend>
          </div>

          <Textfield
            type="text"
            placeholder="プロフィールIDを半角英数字で入力"
            id={"profileid"}
            value={profileid}
            setValue={setProfileID}
            label="プロフィールID *" />

          <Textfield
            type="text"
            placeholder="あなたの名前を入力"
            id={"nickname"}
            value={nickname}
            setValue={setNickname}
            label="ニックネーム *" />

          <Textarea
            placeholder="自分をＰＲしましょう。"
            class="profile-text__introduction"
            id={"introduction"}
            value={introduction}
            setValue={setIntroduction}
            label="自己紹介" />

          <Radio
            class={styles["profile-text__gender"]}
            values={[
              { key: "male", value: "男性" },
              { key: "female", value: "女性" },
              { key: "none", value: "非公開" }]}
            setValue={setGender}
            selectValue={gender} />

          {/* 生年月日は登録するか検討中のため非表示 */}
          {/* <div className={styles["profile-text__birthday"]}>
            <div className={styles["profile-text__birthday--year"]}>
              <List
                dataSource={yearDataSource}
                setValue={setYear}
                label={"生年月日"} />
            </div>
            <div className={styles["profile-text__birthday--month"]}>
              <List
                dataSource={monthDataSource}
                setValue={setMonth}
              />
            </div>
            <div className={styles["profile-text__birthday--day"]}>
              <List
                dataSource={dayDataSource}
                setValue={setDay}
              />
            </div>
          </div> */}

          <div className={styles["profile-text__gamename"]}>
            <Textfield
              type="text"
              placeholder="ゲーム名を入力"
              id={"playgame"}
              value={playgame}
              setValue={setPlaygame}
              label="プレイしているゲーム" />
          </div>

          <div className={styles["profile-text__timezone"]}>
            <div className={styles["profile-text__timezone--start"]}>
              <Textfield
                type="time"
                placeholder=""
                id={"timestart"}
                value={timestart}
                setValue={setTimestart}
                label="プレイしている時間帯" />
            </div>
            <div className={styles["profile-text__timezone--end"]}>
              <Textfield
                type="time"
                placeholder=""
                id={"timeend"}
                value={timeend}
                setValue={setTimeend}
                label="" />
            </div>
          </div>

          {error && (
            <Errormessage
              message={error} />
          )}

          <div className={styles["profile-text__singup"]}>
            <button className={styles["profile-text__register-button"]}
              type="submit"
              onClick={(e) => onRegisterClick(e)}>登録</button>
          </div>

        </form>
      </div>
    </>
  );
};
export default Profileform;