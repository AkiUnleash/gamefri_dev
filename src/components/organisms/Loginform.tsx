import React, { useState } from 'react';
import styles from '../../assets/scss/organisms/login.module.scss';
import mui from '../../assets/css/mui.module.css'
import Textfield from '../atoms/Textfield'
import { auth, provider } from '../../common/firebase/firebase'
import logo from '../../assets/images/logo_sm.svg'
import { browserHistory } from "../../history"

const Loginform = (): JSX.Element => {

  // hookによる状態管理
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // E-mailでのサインイン処理
  const signInEmail = async (event: React.FormEvent) => {
    event.preventDefault()
    // 認証処理
    await auth.signInWithEmailAndPassword(email, password)
    // Homeへ画面遷移
    browserHistory.push("/home")
  }

  // Googleアカウント認証処理
  const signInGoogle = async (event: React.FormEvent) => {
    event.preventDefault()
    // 認証処理
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
    // Homeへ画面遷移
    browserHistory.push("/home")
  };

  return (
    <div className={styles["login-form"]}>
      <div className={styles["login-form__logo"]}><img className={styles["login-form__logoimg"]} src={logo} alt="Site log" /></div>
      <form className={mui["mui-form"]}>
        <div className={styles["login-form__title"]}>
          <legend className={styles["login-form__legend"]}>ゲムフレにログイン</legend>
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

        <div className={styles["login-form__login"]}>
          <button className={styles["login-form__login-button"]}
            onClick={signInEmail} > ログイン</button>
        </div>
        <div className={styles["login-form__supplement"]}>
          <div className={styles["login-form__password-forgot"]}> <a href="./">パスワードを忘れたら？</a></div>
          <div className={styles["login-form__new-account"]}><a href="./signup">新規アカウント登録はこちら</a></div>
        </div>
        <div className={styles["login-other"]}>
          <div className={styles["login-other__title"]}>その他のログイン方法</div>
          <div>
            <button className={styles["login-other__google"]}
              onClick={signInGoogle}>Googleアカウント</button>
          </div>
        </div>
      </form>
    </div >
  );
};
export default Loginform;