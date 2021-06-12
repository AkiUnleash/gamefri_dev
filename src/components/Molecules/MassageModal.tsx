import React from 'react';
import styles from '../../assets/scss/Molecules/massagemodal.module.scss';
import imgClose from '../../assets/images/button/close.svg'

type props = {
  title: string,
  body: string,
  closeAction: () => void,
  closeCaption: string,
  activeAction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  activeCaption?: string,
}

const MassageModal: React.FunctionComponent<props> = (props: props) => {

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
          {props.activeAction && (<button className={styles["massagemodal__send-button"]} onClick={(e) => { if (props.activeAction) { props.activeAction(e) } }} >{props.activeCaption}</button>)}
          <button className={styles["massagemodal__send-button"]} onClick={() => { props.closeAction() }} >{props.closeCaption}</button>
        </div>

      </div>
    </div>
  );
};

export default MassageModal;
