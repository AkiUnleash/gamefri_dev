import React, { useState } from 'react';
import Errormessage from '../atoms/Errormessage'
import { browserHistory } from "../../history"
import Textfield from '../atoms/Textfield'
import Textarea from '../atoms/Textarea'
import styles from '../../assets/scss/organisms/inquiryform.module.scss';
import mui from '../../assets/css/mui.module.css'
import { isName, isEmail, isInquiryTitle, isInquiryBody } from '../../common/validation/validation'
import { functions } from '../../common/firebase/firebase'

const InquiryForm: React.FC = () => {

  // hookでの状態管理
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState<string | undefined>("")

  // 投稿処理
  const onSendClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    // POST停止
    e.preventDefault();

    // バリデーション
    let ErrorData = isName(name)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isEmail(email)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isInquiryTitle(title)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isInquiryBody(body)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    // Functions実行処理を記載
    const data = {
      name: name,
      email: email,
      title: title,
      contents: body
    }
    const sendMail = functions.httpsCallable('sendMail');
    sendMail(data)

    // Homeへ画面遷移
    // browserHistory.push("/")

  }

  return (
    <div className={styles["inquiry"]}>
      <form className={mui["mui-form"]}>

        <div className={styles["inquiry__title"]}>
          <legend className={styles["inquiry__legend"]}>お問い合わせ</legend>
        </div>

        <div className={styles["inquiry__meta"]}>

          <Textfield
            type="text"
            placeholder="名前をご記入ください。"
            id={"name"}
            value={name}
            setValue={setName}
            label="名前 *" />

          <Textfield
            type="text"
            placeholder="メールアドレスをご記入ください。"
            id={"mail"}
            value={email}
            setValue={setEmail}
            label="メールアドレス *" />

        </div>

        <div className={styles["inquiry__contents"]}>
          <Textfield
            type="text"
            placeholder="内容の主旨をご記入ください。"
            id={"title"}
            value={title}
            setValue={setTitle}
            label="タイトル" />

          <Textarea
            placeholder="問い合わせ内容を記入ください。"
            class="inquiry__introduction"
            id={"body"}
            value={body}
            setValue={setBody}
            label="本文 *" />
        </div>

        {error && (
          <Errormessage
            message={error} />
        )}

        <div className={styles["inquiry__singup"]}>
          <button className={styles["inquiry__register-button"]}
            type="submit"
            onClick={(e) => onSendClick(e)} > 投稿 </button>
        </div>

      </form>
    </div>
  );
};
export default InquiryForm;