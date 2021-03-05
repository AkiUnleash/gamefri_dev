import React, { useState } from 'react';
import styles from '../assets/scss/singup.scss';
import mui from '../assets/css/mui.css'
import { auth, provider } from '../common/firebase/firebase'

const Singupform = (): JSX.Element => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Emailでのサインアップ処理
  const signUpEmail = async (event: React.FormEvent) => {
    // form処理の矯正中断
    event.preventDefault()
    // サインアップ
    const authUser = await auth.createUserWithEmailAndPassword(email, password)
    // アドレス確認のメール送信
    const createuser = authUser.user
    createuser && await createuser.sendEmailVerification();
    // 移動
    await location.replace(window.location.origin + '/signupfinished');
  }

  const signInGoogle = async (event: React.FormEvent) => {
    event.preventDefault()
    await auth.signInWithPopup(provider).catch(err => alert(err.message));
  };

  return (
    <div className={styles["singup-form"]}>
      <div className={styles["singup-form__logo"]}><img className={styles["login-form__logoimg"]} src="/images/logo_sm-5e874b25dfe2f8812d86b1cfa916da92.svg" /></div>
      <form onSubmit={signUpEmail} className={mui["mui-form"]}>
        <div className={styles["singup-form__title"]}>
          <legend className={styles["singup-form__legend"]}>ゲムフレに新規アカウント登録</legend>
        </div>
        <div className={mui["mui-textfield"]}>
          <input type="text" placeholder="info@example.com"
            id="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
          <label>ログインID</label>
        </div>
        <div className={mui["mui-textfield"]}>
          <input type="password" placeholder="password"
            id="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
          <label>パスワード</label>
        </div>
        <div className={styles["singup-form__singup"]}>
          <button className={styles["singup-form__singup-button"]}>登録</button>
        </div>
        <div className={styles["singup-form__supplement"]}>
          <div className={styles["singup-form__new-account"]}><a>新規アカウント登録はこちら</a></div>
        </div>
        <div className={styles["singup-other"]}>
          <div className={styles["singup-other__title"]}>その他のログイン方法</div>
          <div>
            <button className={styles["singup-other__google"]}
              onClick={signInGoogle}>Googleアカウント</button>
          </div>
        </div>
      </form>
    </div >
  );
};
export default Singupform;