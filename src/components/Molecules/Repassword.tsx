import React, { useState } from 'react';
import Errormessage from '../atoms/Errormessage'
import Textfield from '../atoms/Textfield'
import styles from '../../assets/scss/Molecules/repassword.module.scss';
import imgClose from '../../assets/images/button/close.svg'
import { isEmail } from '../../common/validation/validation'
import { auth } from '../../common/firebase/firebase'

type props = {
  closeAction: () => void,
}

const Repassword: React.FunctionComponent<props> = (props: props) => {

  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | undefined>("")

  const sendAction = async () => {

    // バリデーション
    const ErrorData = isEmail(email)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    // 認証処理
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (e) {
      switch (e.code) {
        case 'auth/user-not-found':
          setError("入力されたユーザーは登録されていません。")
          return
        case 'auth/wrong-password':
          setError("パスワードが違います。")
          return
      }
    }

    props.closeAction()
  }

  return (
    <div className={styles["repassword__overlay"]}>
      <div className={styles["repassword__form"]}>

        <div className={styles["repassword__close"]}>
          <button onClick={() => props.closeAction()}><img src={imgClose} alt="close" /></button>
        </div>

        <div className={styles["repassword__title"]}>
          <legend className={styles["repassword__legend"]}>パスワードの再設定</legend>
        </div>

        <Textfield
          type="text"
          placeholder="info@example.com"
          id={"email"}
          value={email}
          setValue={setEmail}
          label="ログインID" />

        {error && (
          <Errormessage
            message={error} />
        )}

        <div className={styles["repassword__send"]}>
          <button className={styles["repassword__send-button"]}
            onClick={() => { sendAction() }} >送信</button>
        </div>

      </div>
    </div>
  );
};

export default Repassword;
