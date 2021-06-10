import React from 'react';
import styles from '../../assets/scss/Molecules/massagemodal.module.scss';
import imgClose from '../../assets/images/button/close.svg'

type props = {
  title: string,
  body: string,
  closeAction: () => void,
}

const MassageModal: React.FunctionComponent<props> = (props: props) => {

  const sendAction = async () => {
    props.closeAction()
  }

  return (
    <div className={styles["massagemodal__overlay"]}>
      <div className={styles["massagemodal__form"]}>

        <div className={styles["massagemodal__close"]}>
          <button onClick={() => props.closeAction()}><img src={imgClose} alt="close" /></button>
        </div>

        <div className={styles["massagemodal__title"]}>
          <legend className={styles["massagemodal__legend"]}>{props.title}</legend>
        </div>

        <div>
          {props.body}
        </div>

        <div className={styles["massagemodal__send"]}>
          <button className={styles["massagemodal__send-button"]}
            onClick={() => { sendAction() }} >ＯＫ</button>
        </div>

      </div>
    </div>
  );
};

export default MassageModal;
