import React, { useState } from 'react';
import Errormessage from '../atoms/Errormessage'
import { browserHistory } from "../../history"
import styles from '../../assets/scss/organisms/signupform.module.scss';
import mui from '../../assets/css/mui.module.css'
import Textfield from '../atoms/Textfield'
import { auth, provider } from '../../common/firebase/firebase'
import logo from '../../assets/images/logo_sm.svg'
import { logout } from '../../common/backend/model'
import { isPassword, isEmail } from '../../common/validation/validation'

const Singupform: React.FC = () => {

  // hookでの状態管理
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Emailでのサインアップ処理
  const signUpEmail = async (event: React.FormEvent) => {
    event.preventDefault()

    // バリデーション
    let ErrorData = isPassword(password)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    ErrorData = isEmail(email)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    // サインアップ
    const authUser = await auth.createUserWithEmailAndPassword(email, password)

    // アドレス確認のメール送信
    const createuser = authUser.user
    createuser && await createuser.sendEmailVerification();
    await logout()

    // 移動
    browserHistory.push("/signupfinished")
  }

  // Googleアカウント認証処理
  const signInGoogle = async (event: React.FormEvent) => {
    event.preventDefault()
    await auth.signInWithPopup(provider).catch(err => alert(err.message));
    browserHistory.push("/home")
  };

  return (
    <div className={styles["signup-form"]}>
      <div className={styles["signup-form__logo"]}><img className={styles["signup-form__logoimg"]} src={logo} alt="Site logo" /></div>
      <form onSubmit={signUpEmail} className={mui["mui-form"]}>
        <div className={styles["signup-form__title"]}>
          <legend className={styles["signup-form__legend"]}>ゲムフレに新規アカウント登録</legend>
        </div>

        {error && (
          <Errormessage
            message={error} />
        )}

        <Textfield
          type="text"
          placeholder="info@example.com"
          id={"email"}
          value={email}
          setValue={setEmail}
          label="ログインID" />

        <Textfield
          type="password"
          placeholder="password"
          id={"password"}
          value={password}
          setValue={setPassword}
          label="パスワード" />

        <div className={styles["signup-form__signup"]}>
          <button className={styles["signup-form__signup-button"]}>登録</button>
        </div>

        <div className={styles["signup-form__supplement"]}>
          <div className={styles["signup-form__new-account"]}><a href="./login">ログインはこちら</a></div>
        </div>

        <div className={styles["signup-other"]}>
          <div className={styles["signup-other__title"]}>その他のログイン方法</div>
          <div>
            <button className={styles["signup-other__google"]}
              onClick={signInGoogle}>Googleアカウント</button>
          </div>
        </div>

      </form>
    </div >
  );
};
export default Singupform;