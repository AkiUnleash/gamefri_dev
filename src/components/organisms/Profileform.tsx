import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, updateUserProfile } from '../../common/state/userSlice'
import { browserHistory } from "../../history"
// assets
import styles from '../../assets/scss/profileedit.module.scss';
import mui from '../../assets/css/mui.module.css'
import img_photo_select from '../../assets/images/profile/photo-select.svg'
import img_photo_clear from '../../assets/images/profile/photo-clear.svg'
import img_cover_sample from '../../assets/images/profile/cover-sample.png'
import img_avatar_sample from '../../assets/images/profile/avatar.png'
// atoms
import Textfield from '../atoms/Textfield'
import Textarea from '../atoms/Textarea'
import Radio from '../atoms/Radio'
// common
import * as DataInterface from '../../common/backend/model'
import { db } from '../../common/firebase/firebase'

const Profileform = (): JSX.Element => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  const [profileid, setProfileID] = useState("")
  const [nickname, setNickname] = useState("")
  const [introduction, setIntroduction] = useState("")
  const [gender, setGender] = useState("")
  const [playgame, setPlaygame] = useState("")
  const [timestart, setTimestart] = useState("")
  const [timeend, setTimeend] = useState("")
  const [cover, setCover] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [firstcover, setFirstCover] = useState<string>('')
  const [firstavatar, setFirstAvatar] = useState<string>('')
  // const [year, setYear] = useState<string | "-">("-")
  // const [month, setMonth] = useState<string | "-">("-")
  // const [day, setDay] = useState<string | "-">("-")

  // 生年月日 選択値
  // const yearDataSource = [...Array(new Date().getFullYear() - 1900).keys()].map(i => (i + 1900).toString() + '年').reverse()
  // yearDataSource.unshift('-')
  // const monthDataSource = [...Array(12).keys()].map(i => (i + 1).toString() + '月')
  // monthDataSource.unshift('-')
  // const dayDataSource = [...Array(31).keys()].map(i => (i + 1).toString() + '日')
  // dayDataSource.unshift('-')

  // 画像選択
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>, genre: string) => {

    if (e.target.files === null) { return; }
    const file = e.target.files[0];
    if (file === null) { return; }

    if (genre === "avatar") {
      setAvatar(e.target.files[0])
    } else {
      setCover(e.target.files[0])
    }

    let imgTag = document.getElementById("img_" + genre) as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
    }
  }

  const onChangeImageclear = (genre: string) => {
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

  const onRegisterClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // POST停止
    e.preventDefault();

    let avatarurl = ''
    if (avatar) {
      avatarurl = await DataInterface.imageAdd('avatar', avatar.name, avatar)
    } else {
      avatarurl = firstavatar
    }

    let coverurl = ''
    if (cover) {
      coverurl = await DataInterface.imageAdd('cover', cover.name, cover)
    } else {
      coverurl = firstcover
    }

    DataInterface.updateProfile(nickname, avatarurl)

    dispatch(
      updateUserProfile({
        displayName: nickname,
        photoUrl: avatarurl,
      })
    );

    console.log(timestart, timeend);

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
        coverurl: coverurl
      },
      {
        colection1: 'user',
        documents1: user.uid,
      },
      true
    )
    browserHistory.push("/home")
  }

  useEffect(() => {
    db.collection("user")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        setNickname(snapshot.data()?.nickname)
        setProfileID(snapshot.data()?.profileid)
        setIntroduction(snapshot.data()?.introduction)
        setGender(snapshot.data()?.gender)
        setPlaygame(snapshot.data()?.playgame)
        setTimestart(snapshot.data()?.timestart)
        setTimeend(snapshot.data()?.timeend)
        setFirstAvatar(snapshot.data()?.avatarurl)
        setFirstCover(snapshot.data()?.coverurl)
      })
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
            placeholder="プロフィールIDを入力"
            id={"profileid"}
            value={profileid}
            setValue={setProfileID}
            label="プロフィールID" />

          <Textfield
            type="text"
            placeholder="あなたの名前を入力"
            id={"nickname"}
            value={nickname}
            setValue={setNickname}
            label="ニックネーム" />

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