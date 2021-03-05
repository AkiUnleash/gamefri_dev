import React, { useState } from 'react';
import styles from '../assets/scss/login.scss';
import mui from '../assets/css/mui.css'
import { auth, provider } from '../common/firebase/firebase'

const Loginform = (): JSX.Element => {
  const [email, setEmail] = useState("")
  const [password, setPssword] = useState("")

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password)
  }
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className={styles["login-form"]}>
      <div className={styles["login-form__logo"]}><img className={styles["login-form__logoimg"]} src="/images/logo_sm-5e874b25dfe2f8812d86b1cfa916da92.svg" /></div>
      <form className={mui["mui-form"]}>
        <div className={styles["login-form__title"]}>
          <legend className={styles["login-form__legend"]}>ゲムフレにログイン</legend>
        </div>
        <div className={mui["mui-textfield"]}>
          <input type="text" placeholder="info@example.com"
            id="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
          <label>ログイン</label>
        </div>
        <div className={mui["mui-textfield"]}>
          <input type="text" placeholder="password"
            id="password"
            value={password}
            onChange={(e) => { setEmail(e.target.value) }} />
          <label>パスワード</label>
        </div>
        <div className={styles["login-form__login"]}>
          <button className={styles["login-form__login-button"]}
            onClick={signInEmail}>ログイン</button>
        </div>
        <div className={styles["login-form__supplement"]}>
          <div className={styles["login-form__password-forgot"]}> <a>パスワードを忘れたら？</a></div>
          <div className={styles["login-form__new-account"]}><a>新規アカウント登録はこちら</a></div>
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