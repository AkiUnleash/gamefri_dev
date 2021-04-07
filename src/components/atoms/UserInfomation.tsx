import * as React from 'react';
import styles from '../../assets/scss/userinfomation.module.scss'

type props = {
  photoUrl: string,
  displayName: string,
  date: string
}

const UserInfomation = (props: props): JSX.Element => {
  return (
    <div className={styles["contributor-infomation"]}>
      <img className={styles["contributor-infomation__avatar"]} src={props.photoUrl} alt="avatar photos" />
      <div className={styles["contributor-infomation__data"]}>
        <div className={styles["contributor-infomation__name"]}>{props.displayName}</div>
        <div className={styles["contributor-infomation__date"]}>{props.date}</div>
      </div>
    </div>
  );
};
export default UserInfomation;