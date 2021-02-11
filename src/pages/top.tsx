import * as React from 'react';
import * as styles from '../assets/scss/top.scss';
// Component
import Header from '../components/header';
import Footer from '../components/footer';
// img
import logo from '../assets/images/logo.svg'
import detail_img_1 from '../assets/images/top/top-img1.png'
import detail_img_2 from '../assets/images/top/top-img2.png'
import detail_img_3 from '../assets/images/top/top-img3.png'


const detail = (): JSX.Element => {
  const detail_data = [
    {
      title: "ゲームの種類でフレンドを探そう！",
      disctiption: "自分と同じゲームをしている人と繋がりたい。ゲームの種類で検索をして、一緒に遊べるフレンドを検索できます。",
      image: detail_img_1,
      style: "top-detail__figure"
    },
    {
      title: "約束をして協力プレイ！！",
      disctiption: "同じ時間帯にゲームをするフレンドを誘って一緒にゲームをしよう！",
      image: detail_img_2,
      style: "top-detail__figure_reversai"
    },
    {
      title: "楽しかったことを皆にシェア！",
      disctiption: "ゲーム日記をつけることができます。皆からコメントを貰って、フレンドを増やそう！",
      image: detail_img_3,
      style: "top-detail__figure"
    },
  ]

  const items = detail_data.map((item, key) => {
    return (
      <section className={styles["top-detail"]} key={key}>
        <figure className={styles[item.style]}><img className={styles["top-detail__figure-img"]} src={item.image} alt="" />
          <figcaption className={styles["top-detail__figcaption"]}>
            <div className={styles["top-detail__title"]}>{item.title}</div>
            <div className={styles["top-detail__discription"]}>{item.disctiption}</div>
          </figcaption>
        </figure>
      </section >
    )
  });
  return (<>{items}</>);
};



const massage = (): JSX.Element => {
  const title_why: string = "ゲムフレとは？"
  const title_discription: string[] =
    ["「 世界中のみんなと協力してゲームをしたい！ 」",
      "ゲーム専用のソーシャルネットワークサービスです。"]

  return (
    <section className={styles["top-massage"]}>
      <div className={styles["top-massage__title-why"]}>{title_why}</div>
      <div className={styles["top-massage__title-discription"]}>{title_discription[0]}</div>
      <div className={styles["top-massage__title-discription"]}>{title_discription[1]}</div>
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
        <div className={styles["top-introduction__button"]}><a className={styles["top-introduction__button--fill"]} href="./singup.html">{button_singup}</a></div>
        <div className={styles["top-introduction__button"]}><a className={styles["top-introduction__button--white"]} href="./login.html">{button_login}</a></div>
      </section>
    </>
  );
};

const TodoList = (): JSX.Element => {
  return (
    <>
      <Header />
      {introduction()}
      {massage()}
      {detail()}
      <Footer />
    </>
  );
};

export default TodoList;