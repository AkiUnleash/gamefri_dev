import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../assets/scss/pages/top.module.scss';
// Component
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
// img
import logo from '../../assets/images/logo.svg'
import detail_img_1 from '../../assets/images/top/top-img1.png'
import detail_img_2 from '../../assets/images/top/top-img2.png'
import detail_img_3 from '../../assets/images/top/top-img3.png'
// common
import { loginChack_done } from "../../common/backend/model"


const Detail1 = (): JSX.Element => {
  const { ref, inView } = useInView({ rootMargin: '-50% 0px', triggerOnce: true });

  const detail_data = [
    {
      title: "ゲームの種類でフレンドを探そう！",
      disctiption: "自分と同じゲームをしている人と繋がりたい。ゲームの種類で検索をして、一緒に遊べるフレンドを検索できます。",
      image: detail_img_1,
      style: "top-detail__figure"
    },
  ]

  const items = detail_data.map((item, key) => {
    return (
      <section ref={ref} className={styles["top-detail"]} key={key}>
        <figure className={styles[item.style]}><img className={inView ? styles["top-detail__figure-img"] : styles['none']} src={item.image} alt="" />
          <figcaption className={styles["top-detail__figcaption"]}>
            <div className={inView ? styles["top-detail__title"] : styles['none']}>{item.title}</div>
            <div className={inView ? styles["top-detail__discription"] : styles['none']}>{item.disctiption}</div>
          </figcaption>
        </figure>
      </section >
    )
  });
  return (<>{items}</>);
};

const Detail2 = (): JSX.Element => {
  const { ref, inView } = useInView({ rootMargin: '-40% 0px', triggerOnce: true });

  const detail_data = [
    {
      title: "約束をして協力プレイ！！",
      disctiption: "同じ時間帯にゲームをするフレンドを誘って一緒にゲームをしよう！",
      image: detail_img_2,
      style: "top-detail__figure_reversai"
    },
  ]

  const items = detail_data.map((item, key) => {
    return (
      <section ref={ref} className={styles["top-detail"]} key={key}>
        <figure className={styles[item.style]}><img className={inView ? styles["top-detail__figure-img"] : styles['none']} src={item.image} alt="" />
          <figcaption className={styles["top-detail__figcaption"]}>
            <div className={inView ? styles["top-detail__title"] : styles['none']}>{item.title}</div>
            <div className={inView ? styles["top-detail__discription"] : styles['none']}>{item.disctiption}</div>
          </figcaption>
        </figure>
      </section >
    )
  });
  return (<>{items}</>);
};

const Detail3 = (): JSX.Element => {
  const { ref, inView } = useInView({ rootMargin: '-30% 0px', triggerOnce: true });

  const detail_data = [
    {
      title: "楽しかったことを皆にシェア！",
      disctiption: "ゲーム日記をつけることができます。皆からコメントを貰って、フレンドを増やそう！",
      image: detail_img_3,
      style: "top-detail__figure"
    },
  ]

  const items = detail_data.map((item, key) => {
    return (
      <section ref={ref} className={styles["top-detail"]} key={key}>
        <figure className={styles[item.style]}><img className={inView ? styles["top-detail__figure-img"] : styles['none']} src={item.image} alt="" />
          <figcaption className={styles["top-detail__figcaption"]}>
            <div className={inView ? styles["top-detail__title"] : styles['none']}>{item.title}</div>
            <div className={inView ? styles["top-detail__discription"] : styles['none']}>{item.disctiption}</div>
          </figcaption>
        </figure>
      </section >
    )
  });
  return (<>{items}</>);
};



const Massage = (): JSX.Element => {
  const { ref, inView } = useInView({ rootMargin: '-20% 0px', triggerOnce: true });
  const title_why: string = "ゲムフレとは？"
  const title_discription: string[] =
    ["「 世界中のみんなと協力してゲームをしたい！ 」",
      "ゲーム専用のソーシャルネットワークサービスです。"]

  return (
    <section ref={ref} className={styles["top-massage"]}>
      <div className={inView ? styles["top-massage__title-why"] : styles['none']}>{title_why}{console.log(`${inView}`)}</div>
      <div className={inView ? styles["top-massage__title-discription"] : styles['none']}>{title_discription[0]}</div>
      <div className={inView ? styles["top-massage__title-discription"] : styles['none']}>{title_discription[1]}</div>
    </section>
  );
}

const introduction = (): JSX.Element => {
  const catchphrase: string = "ゲームフレンド、欲しくないですか？"
  const button_singup: string = "▶ 新規アカウント作成"
  const button_login: string = "ログイン"


  return (
    <>
      <section className={styles["top-introduction"]}>
        <div><img className={styles["top-introduction__logimg"]} src={logo} /></div>
        <div className={styles["top-introduction__catchphrase"]}>{catchphrase}</div>
        <div className={styles["top-introduction__button"]}><a className={styles["top-introduction__button--fill"]} href="./signup">{button_singup}</a></div>
        <div className={styles["top-introduction__button"]}><a className={styles["top-introduction__button--white"]} href="./login">{button_login}</a></div>
      </section>
    </>
  );
};

const Top: React.FC = () => {

  useEffect(() => {
    // 既にログイン済みの場合はHomeへ移動
    loginChack_done()
  })

  return (
    <>
      <Header />
      {introduction()}
      {Massage()}
      {Detail1()}
      {Detail2()}
      {Detail3()}
      <Footer />
    </>
  );
};

export default Top;