import React, { useState, useRef } from 'react';
import Errormessage from '../atoms/Errormessage'
import { useSelector } from 'react-redux'
import { browserHistory } from "../../history"
import Textfield from '../atoms/Textfield'
import Textarea from '../atoms/Textarea'
import styles from '../../assets/scss/organisms/diarywriteform.module.scss';
import mui from '../../assets/css/mui.module.css'
import img_attach from '../../assets/images/diarywrite/image_attach.svg'
import * as DataInterface from '../../common/backend/model'
import { selectUser } from "../../common/state/userSlice"
import { isDiraryTitle, isDiraryBody } from '../../common/validation/validation'

const DiaryWriteForm: React.FC = () => {

  // hookでの状態管理
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [gamename, setGamename] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState<string | undefined>("")
  const processing = useRef(false);

  // Reduxにて状態管理のデータを取得
  const user = useSelector(selectUser)

  // 画像選択クリック時の処理
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>, genre: string) => {

    // 画像が選択されているかの確認
    if (e.target.files === null) { return; }
    const file = e.target.files[0];
    if (file === null) { return; }

    // 選択された画像の保存
    setImage(e.target.files[0])

    // 選択した画像の表示
    let imgTag = document.getElementById("img_attach") as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
    }
  }

  // 投稿処理
  const onRegisterClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // POST停止
    e.preventDefault();

    // 多重クリック防止
    if (processing.current) return;
    processing.current = true;
    setTimeout(() => {
      processing.current = false;
    }, 5000);

    // バリデーション
    let ErrorData = isDiraryTitle(title)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isDiraryBody(body)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    // イメージをFireStrageに保存
    let imageurl = ''
    if (image) {
      imageurl = await DataInterface.imageAdd('posts_attach', image.name, image)
    }

    // データをFirestoreへ送信
    // コレクション [ Post ] 
    const refid = await DataInterface.dataAdd(
      {
        title: title,
        body: body,
        gamename: gamename,
        attachimage: imageurl,
        nicecount: 0,
        profileid: user.profileID,
        avatarurl: user.photoUrl,
        nickname: user.displayName,
        userID: user.uid,
      },
      {
        colection1: 'user',
        documents1: user.uid,
        colection2: "posts"
      },
      true
    )

    // コレクション [ Timeline ] 
    if (refid) {
      await DataInterface.dataAdd(
        {
          userID: user.uid,
          postID: refid
        },
        {
          colection1: 'user',
          documents1: user.uid,
          colection2: "timeline",
          documents2: refid,
        },
        true
      )
    }

    // Homeへ画面遷移
    browserHistory.push("/home")
  }

  return (
    <div className={styles["diarywrite"]}>
      <form className={mui["mui-form"]}>
        <div className={styles["diarywrite__title"]}>
          <legend className={styles["diarywrite__legend"]}>日記を書く</legend>
        </div>

        <div className={styles["diarywrite-attach"]}>
          <label>
            <span className={styles["diarywrite-attach__link"]} >
              <img className={styles["diarywrite-attach__image"]} src={img_attach} alt="画像添付" />
              <span className={styles["diarywrite-attach__letter"]}>画像を追加</span>
              <input type="file" className={styles["diarywrite-attach__input"]} onChange={(e) => onChangeImage(e, "cover")} />
            </span>
          </label>
          <div className={styles["diarywrite-attach__attach-div"]}>
            <img className={styles["diarywrite-attach__attach-img"]} id="img_attach" src="" alt="" />
          </div>
        </div>

        <Textfield
          type="text"
          placeholder="日記のタイトルを記載しましょう。"
          id={"title"}
          value={title}
          setValue={setTitle}
          label="タイトル *" />

        <Textarea
          placeholder="日記の内容を記載しましょう。"
          class="diarywrite__introduction"
          id={"body"}
          value={body}
          setValue={setBody}
          label="本文 *" />

        <Textfield
          type="text"
          placeholder="ゲーム名を入力"
          id={"gamename"}
          value={gamename}
          setValue={setGamename}
          label="プレイしたゲーム" />

        {error && (
          <Errormessage
            message={error} />
        )}

        <div className={styles["diarywrite__singup"]}>
          <button className={styles["diarywrite__register-button"]}
            type="submit"
            onClick={(e) => onRegisterClick(e)} > 投稿 </button>
        </div>

      </form>
    </div>
  );
};
export default DiaryWriteForm;