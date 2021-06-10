import * as React from 'react';
import { Link } from 'react-router-dom'
import styles from '../../assets/scss/organisms/footer.module.scss';
import logo from '../../assets/images/logo.svg'

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-div"]}>
        <nav className={styles["footer-nav"]}>
          <p className={styles["footer-nav__title"]}>規約</p>
          <ul className={styles["footer-nav__ul"]}>
            <li className={styles["footer-nav__li"]}><Link to="/service">利用規約</Link></li>
            <li className={styles["footer-nav__li"]}><Link to="/policies">プライバシーポリシー</Link></li>
          </ul>
        </nav>
        <nav className={styles["footer-nav"]}>
          <p className={styles["footer-nav__title"]}>サポート</p>
          <ul className={styles["footer-nav__ul"]}>
            <li className={styles["footer-nav__li"]}><Link to="/price">料金</Link></li>
            <li className={styles["footer-nav__li"]}><Link to="/question">よくある質問</Link></li>
            <li className={styles["footer-nav__li"]}> <Link to="./inquiry">お問い合わせ</Link></li>
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