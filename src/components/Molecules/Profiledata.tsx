import React from 'react';
// assets
import img_cover_sample from '../../assets/images/profile/cover-sample.png'
import img_avatar_sample from '../../assets/images/profile/avatar.png'
import styles from '../../assets/scss/profiledata.module.scss';

type props = {
  avatarimage: string,
  coverimage: string,
  followercount: number,
  nickname: string,
  introduction: string,
  gender: string,
  birthday: string,
  playgame: string,
  gametime: string
}

const Profiledata: React.FC<props> = (props: props) => {

  return (
    <>
      <div className={styles["profiledata-img"]}>
        <img className={styles["profiledata-img__cover-photo"]} id="img_cover" src={props.coverimage ? props.coverimage : img_cover_sample} alt="cover photos" />
        <img className={styles["profiledata-img__avatar-photo"]} id="img_avatar" src={props.avatarimage ? props.avatarimage : img_avatar_sample} alt="avatar photos" />
      </div>

      <div className={styles["profiledata-follow"]}>
        <div>
          <div className={styles["profiledata-follow__title"]}>フォロワー</div>
          <span className={styles["profiledata-follow__value"]}>12000人</span>
        </div>
        <button className={styles["profiledata-follow__button--follow-yet"]}>フォロー</button>
      </div>

      <div className={styles["profiledata-data"]}>
        <div className={styles["profiledata-data__one-line"]}>
          <div className={styles["profiledata-data__title"]}>ニックネーム</div>
          <div className={styles["profiledata-data__value"]}>{props.nickname}</div>
        </div>
        <div className={styles["profiledata-data__one-line"]}>
          <div className={styles["profiledata-data__title"]}>自己紹介</div>
          <p className={styles["profiledata-data__value"]}>{props.introduction}</p>
        </div>
        <div className={styles["profiledata-data__side-by-side"]}>
          <div>
            <div className={styles["profiledata-data__title"]}>性別</div>
            <div className={styles["profiledata-data__value"]}>{props.gender}</div>
          </div>
          <div className={styles["profiledata-data__side-by-side--right"]}>
            <div className={styles["profiledata-data__title"]}>生年月日</div>
            <div className={styles["profiledata-data__value"]}>{props.birthday}</div>
          </div>
        </div>
        <div className={styles["profiledata-data__one-line"]}>
          <div className={styles["profiledata-data__title"]}>プレイしているゲーム</div>
          <div className={styles["profiledata-data__value"]}>{props.playgame}</div>
        </div>
        <div className={styles["profiledata-data__one-line"]}>
          <div className={styles["profiledata-data__title"]}>プレイしている時間帯</div>
          <div className={styles["profiledata-data__value"]}>{props.gametime}</div>
        </div>
      </div>
    </>
  );
};

export default Profiledata;
