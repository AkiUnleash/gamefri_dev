import React, { useState } from 'react';
// assets
import styles from '../../assets/scss/profileedit.scss';
import mui from '../../assets/css/mui.css'
import img_photo_select from '../../assets/images/profile/photo-select.svg'
import img_cover_sample from '../../assets/images/profile/cover-sample.png'
import img_avatar from '../../assets/images/profile/avatar.png'
// atoms
import Textfield from '../atoms/Textfield'
import Textarea from '../atoms/Textarea'
import Radio from '../atoms/Radio'
import List from '../atoms/List'

const Profileform = (): JSX.Element => {

  const [nickname, setNickname] = useState("")
  const [introduction, setIntroduction] = useState("")
  const [gender, setGender] = useState("")
  const [playgame, setPlaygame] = useState("")
  const [timestart, setTimestart] = useState("")
  const [timeend, setTimeend] = useState("")
  const [cover, setCover] = useState("")
  const [avater, setAvater] = useState("")

  // 生年月日 選択値
  const year = [...Array(new Date().getFullYear() - 1900).keys()].map(i => (i + 1900).toString() + '年').reverse()
  const month = [...Array(12).keys()].map(i => (i + 1).toString() + '月')
  const day = [...Array(31).keys()].map(i => (i + 1).toString() + '日')

  // 画像選択
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>, genre: string) => {

    if (e.target.files === null) { return; }
    const file = e.target.files[0];
    if (file === null) { return; }

    let imgTag = document.getElementById("img_" + genre) as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
      if (genre === "avater") {
        setAvater(result)
      } else {
        setCover(result)
      }
    }

  }

  return (
    <>
      <div className={styles["profile-img"]}>
        <img className={styles["profile-img__cover-photo"]} id="img_cover" src={img_cover_sample} alt="cover photos" />
        <label>
          <img className={styles["profile-img__cover-photoselect"]} src={img_photo_select} alt="cover photo select" />
          <input type="file" className={styles["profile-img__filesend"]} onChange={(e) => onChangeImage(e, "cover")} />
        </label>
        <a href="">
          <img className={styles["profile-img__avatar-photo"]} id="img_avater" src={img_avatar} alt="avatar photos" />
          <label>
            <img className={styles["profile-img__avatar-photoselect"]} src={img_photo_select} alt="avatar photo select" />
            <input type="file" className={styles["profile-img__filesend"]} onChange={(e) => onChangeImage(e, "avater")} />
          </label>
        </a>
      </div>
      <div className={styles["profile-text"]}>
        <form className={mui["mui-form"]}>
          <div className={styles["profile-text__title"]}>
            <legend className={styles["profile-text__legend"]}>プロフィール編集</legend>
          </div>

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
              { key: "female", value: "女性" }]}
            setValue={setGender} />

          <div className={styles["profile-text__birthday"]}>
            <div className={styles["profile-text__birthday--year"]}>
              <List
                value={year}
                label={"生年月日"} />
            </div>

            <div className={styles["profile-text__birthday--month"]}>
              <List
                value={month} />
            </div>

            <div className={styles["profile-text__birthday--day"]}>
              <List
                value={day} />
            </div>

          </div>

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
            <button className={styles["profile-text__register-button"]} type="submit"> 登録</button>
          </div>

        </form>
      </div>
    </>
  );
};
export default Profileform;