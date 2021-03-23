import React from 'react';
import styles from '../../assets/scss/home.module.scss';

type props = {
  title: string,
  gametitle: string,
  attach_photo?: string,
  likecount: number,
  link: string,
  displayName: string,
  avatar_photo: string,
  create_at: string,
}

const Diarycard: React.FC<props> = (props: props) => {
  return (
    props.attach_photo ?
      <>
        <div className={styles["cardaria"]}>
          <a className={styles["card"]} href={props.link}>
            <div className={styles["diary-imgcard"]}>
              <div className={styles["diary-imgcard__photo"]}>
                <img className={styles["diary-imgcard__photo-img"]} src={props.attach_photo} />
                <p className={styles["diary-imgcard__gametitle"]}>{props.gametitle}</p>
                <p className={styles["diary-imgcard__title"]}>{props.title}</p>
              </div>
              <div className={styles["diary-imgcard__infomation"]}>
                <img className={styles["diary-imgcard__avatar"]} src={props.avatar_photo} alt="avatar photos" />
                <div className={styles["diary-imgcard__data"]}>
                  <div className={styles["diary-imgcard__name"]}>{props.displayName}</div>
                  <div className={styles["diary-imgcard__date"]}>{props.create_at}</div>
                </div>
                <div className={styles["diary-imgcard__nice"]}> <div>Nice! {props.likecount}</div> </div>
              </div>
            </div>
          </a>
        </div>
      </>
      :
      <>
        <div className={styles["cardaria"]}>
          <a className={styles["card"]} href={props.link}>
            <div className={styles["diary-card"]}>
              <div className={styles["diary-card__text"]}>
                <p className={styles["diary-card__gametitle"]}>{props.gametitle}</p>
                <p className={styles["diary-card__title"]}>{props.title}</p>
              </div>
              <div className={styles["diary-card__infomation"]}>
                <img className={styles["diary-card__avatar"]} src={props.avatar_photo} alt="avatar photos" />
                <div className={styles["diary-card__data"]}>
                  <div className={styles["diary-card__name"]}>{props.displayName}</div>
                  <div className={styles["diary-card__date"]}>{props.create_at}</div>
                </div>
                <div className={styles["diary-card__nice"]}>
                  <div>Nice! {props.likecount}</div>
                </div>
              </div>
            </div></a>
        </div>
      </>
  );
};

export default Diarycard;
