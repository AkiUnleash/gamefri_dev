import React from 'react';
import styles from '../../assets/scss/search.module.scss'
import Button from '../atoms/Button'
import UserInfomation from '../atoms/UserInfomation'

type props = {
  link: string,
  photoUrl: string,
  displayName: string,
  profileId: string,
  message: string,
  button: boolean
}

const Usercard: React.FC<props> = (props: props) => {
  return (
    <>
      <div className={styles["user-card"]}>
        <a href={props.link}>
          <div className={styles["user-card__first-line"]}>
            <div className={styles["user-card__first-line--infomation"]}>
              <UserInfomation
                photoUrl={props.photoUrl}
                displayName={props.displayName}
                date={props.profileId}
              />
            </div>
          </div>
          <div className="user-card__introduction"> {props.message} </div>
        </a>
        <div className={styles["user-card__first-line--follow"]}>
          {props.button &&
            <Button
              classDiv=""
              classButton={"follow__button--yet"}
              value={"フォロー"}
              action={() => {
                alert("ここでも出来るフォロー機能を作成予定。今はリンクを開いて、フォローしてください。")
              }} />
          }
        </div>
      </div>
    </>
  );
};

export default Usercard;
