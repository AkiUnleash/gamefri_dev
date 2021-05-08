import React, { useState } from 'react';
import Errormessage from '../atoms/Errormessage'
import styles from '../../assets/scss/organisms/login.module.scss';
import mui from '../../assets/css/mui.module.css'
import Textfield from '../atoms/Textfield'
import Repassword from '../molecules/Repassword'
import { auth, provider } from '../../common/firebase/firebase'
import logo from '../../assets/images/logo_sm.svg'
import { browserHistory } from "../../history"
import { isPassword, isEmail } from '../../common/validation/validation'

const Loginform: React.FC = () => {

  // hookによる状態管理
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | undefined>("")
  const [repassword, setRepassword] = useState(false)

  // パスワード再設定コンポーネントを閉じる
  const repasswordClose = () => { setRepassword(false) }

  // E-mailでのサインイン処理
  const signInEmail = async (event: React.FormEvent) => {

    event.preventDefault()

    // バリデーション
    let ErrorData = isEmail(email)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isPassword(password)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    // 認証処理
    try {
      await auth.signInWithEmailAndPassword(email, password)
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
    <>
      <div className={styles["login-form"]}>
        <div className={styles["login-form__logo"]}><img className={styles["login-form__logoimg"]} src={logo} alt="Site log" /></div>
        <form className={mui["mui-form"]}>
          <div className={styles["login-form__title"]}>
            <legend className={styles["login-form__legend"]}>ゲムフレにログイン</legend>
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

          <div className={styles["login-form__login"]}>
            <button className={styles["login-form__login-button"]}
              onClick={signInEmail} > ログイン</button>
          </div>
          <div className={styles["login-form__supplement"]}>
            <div className={styles["login-form__password-forgot"]}>
              <button onClick={(e) => { e.preventDefault(); setRepassword(true); }}>パスワードを忘れたら？</button>
            </div>
            <div className={styles["login-form__new-account"]}>
              <a href="./signup">新規アカウント登録はこちら</a>
            </div>
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

      {repassword && (
        <Repassword
          closeAction={repasswordClose} />
      )}

    </>
  );

};
export default Loginform;