import React, { useState } from 'react';
import Textfield from '../atoms/Textfield'
import styles from '../../assets/scss/Molecules/repassword.module.scss';
import imgClose from '../../assets/images/button/close.svg'
import { rePasswordSend } from '../../common/backend/model'

type props = {
  closeAction: () => void,
}

const Repassword: React.FunctionComponent<props> = (props: props) => {

  const [email, setEmail] = useState("")

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
        <div className={styles["repassword__send"]}>
          <button className={styles["repassword__send-button"]}
            onClick={() => {
              rePasswordSend(email);
              props.closeAction()
            }} >送信</button>
        </div>
      </div>
    </div>
  );
};

export default Repassword;
