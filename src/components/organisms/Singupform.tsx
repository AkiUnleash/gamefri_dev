import React, { useState } from 'react';
import styles from '../../assets/scss/signup.scss';
import mui from '../../assets/css/mui.css'
import Textfield from '../atoms/Textfield'
import { auth, provider } from '../../common/firebase/firebase'
import logo from '../../assets/images/logo_sm.svg'

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
          label="ログイン" />

        <Textfield
          type="password"
          placeholder="password"
          id={"password"}
          value={password}
          setValue={setPassword}
          label="パスワード" />

        <div className={styles["signup-form__singup"]}>
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