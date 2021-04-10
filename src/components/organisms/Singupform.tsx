import React, { useState } from 'react';
import { browserHistory } from "../../history"
import styles from '../../assets/scss/signup.module.scss';
import mui from '../../assets/css/mui.module.css'
import Textfield from '../atoms/Textfield'
import { auth, provider } from '../../common/firebase/firebase'
import logo from '../../assets/images/logo_sm.svg'
import { logout } from '../../common/backend/model'
import { ALPN_ENABLED } from 'node:constants';

const Singupform = (): JSX.Element => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Emailでのサインアップ処理
  const signUpEmail = async (event: React.FormEvent) => {
    // form処理の矯正中断
    event.preventDefault()
    // バリデーション
    if (!/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{7,100}$/i.test(password)) {
      alert("パスワードは英数字７文字以上で入力してください。")
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

  const signInGoogle = async (event: React.FormEvent) => {
    event.preventDefault()
    await auth.signInWithPopup(provider).catch(err => alert(err.message));
    browserHistory.push("/home")
  };

  return (
    <div className={styles["signup-form"]}>
      <div className={styles["signup-form__logo"]}><img className={styles["signup-form__logoimg"]} src={logo} /></div>
      <form onSubmit={signUpEmail} className={mui["mui-form"]}>
        <div className={styles["signup-form__title"]}>
          <legend className={styles["signup-form__legend"]}>ゲムフレに新規アカウント登録</legend>
        </div>

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
          <div className={styles["signup-form__new-account"]}><a>新規アカウント登録はこちら</a></div>
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