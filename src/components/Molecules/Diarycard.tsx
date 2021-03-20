import React from 'react';
import styles from '../../assets/scss/home.module.scss';
// test
import imgcard_avatar from '../../assets/images/home/avatar2.jpg'
import imgcard_screen from '../../assets/images/home/game1.jpg'

type props = {
  title: string,
  gametitle: string
}

const Diarycard: React.FC<props> = (props: props) => {
  return (
    <>
      <div className={styles["cardaria"]}>
        <a className={styles["card"]} href="">
          <div className={styles["diary-imgcard"]}>
            <div className={styles["diary-imgcard__photo"]}>
              <img className={styles["diary-imgcard__photo-img"]} src={imgcard_screen} />
              <p className={styles["diary-imgcard__gametitle"]}>{props.gametitle}</p>
              <p className={styles["diary-imgcard__title"]}>{props.title}</p>
            </div>
            <div className={styles["diary-imgcard__infomation"]}>
              <img className={styles["diary-imgcard__avatar"]} src={imgcard_avatar} alt="avatar photos" />
              <div className={styles["diary-imgcard__data"]}>
                <div className={styles["diary-imgcard__name"]}>ミナ</div>
                <div className={styles["diary-imgcard__date"]}>2021/01/24</div>
              </div>
              <div className={styles["diary-imgcard__nice"]}> <div>Nice! 7</div> </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Diarycard;
