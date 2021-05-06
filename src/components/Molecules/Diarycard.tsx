import React from 'react';
import { Link } from 'react-router-dom'
import styles from '../../assets/scss/Molecules/diarycard.module.scss';
import UserInfomation from '../atoms/UserInfomation';

// このコンポーネントで扱う型宣言
type props = {
  title: string,
  gametitle: string,
  attach_photo?: string,
  nicecount: number,
  link: string,
  displayName: string,
  avatar_photo: string,
  create_at: string,
}

const Diarycard: React.FC<props> = (props: props) => {
  // 種類は投稿画像の有無で判断
  return (
    props.attach_photo ?
      <>
        <Link className={styles["card"]} to={props.link}>
          <div className={styles["diary-imgcard"]}>
            <div className={styles["diary-imgcard__photo"]}>
              <img className={styles["diary-imgcard__photo-img"]} src={props.attach_photo} alt="Posted" />
              <p className={styles["diary-imgcard__gametitle"]}>{props.gametitle}</p>
              <p className={styles["diary-imgcard__title"]}>{props.title}</p>
            </div>
            <div className={styles["diary-imgcard__infomation"]}>
              <UserInfomation
                photoUrl={props.avatar_photo}
                displayName={props.displayName}
                date={props.create_at}
              />
              <div className={styles["diary-imgcard__nice"]}> <div>Nice! {props.nicecount}</div> </div>
            </div>
          </div>
        </Link>
      </>
      :
      <>
        <Link className={styles["card"]} to={props.link}>
          <div className={styles["diary-card"]}>
            <div className={styles["diary-card__text"]}>
              <p className={styles["diary-card__gametitle"]}>{props.gametitle}</p>
              <p className={styles["diary-card__title"]}>{props.title}</p>
            </div>
            <div className={styles["diary-card__infomation"]}>
              <UserInfomation
                photoUrl={props.avatar_photo}
                displayName={props.displayName}
                date={props.create_at}
              />
              <div className={styles["diary-card__nice"]}>
                <div>Nice! {props.nicecount}</div>
              </div>
            </div>
          </div></Link>
      </>
  );
};

export default Diarycard;
