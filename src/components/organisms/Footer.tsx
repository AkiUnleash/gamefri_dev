import * as React from 'react';
import styles from '../../assets/scss/footer.module.scss';
import logo from '../../assets/images/logo.svg'

const Footer = (): JSX.Element => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-div"]}>
        <nav className={styles["footer-nav"]}>
          <p className={styles["footer-nav__title"]}>規約</p>
          <ul className={styles["footer-nav__ul"]}>
            <li className={styles["footer-nav__li"]}> <a href="./">利用規約</a></li>
            <li className={styles["footer-nav__li"]}> <a href="./">プライバシーポリシー</a></li>
          </ul>
        </nav>
        <nav className={styles["footer-nav"]}>
          <p className={styles["footer-nav__title"]}>サポート</p>
          <ul className={styles["footer-nav__ul"]}>
            <li className={styles["footer-nav__li"]}> <a href="./">料金</a></li>
            <li className={styles["footer-nav__li"]}> <a href="./">よくある質問</a></li>
            <li className={styles["footer-nav__li"]}> <a href="./">お問い合わせ</a></li>
          </ul>
        </nav>
        <nav className={styles["footer-nav"]}>
          <p className={styles["footer-nav__title"]}>サービス</p>
          <ul className={styles["footer-nav__ul"]}>
            <li className={styles["footer-nav__li"]}> <a href="./">運営会社</a></li>
            <li className={styles["footer-nav__li"]}> <a href="./">公式ツイッター</a></li>
          </ul>
        </nav>
      </div>
      <div className={styles["footer-log"]}><img className={styles["footer-log__img"]} src={logo} alt="" /></div>
      <p className={styles["footer-copyright"]}>© GameFre, Inc.</p>
    </footer>
  );
};
export default Footer;