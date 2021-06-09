import React from 'react';
import styles from '../../assets/scss/organisms/header.module.scss';
import logo from '../../assets/images/logo.svg'
import logo_sm from '../../assets/images/logo_sm.svg'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-desktop"]}><Link to="./"><img className={styles["header-desktop__img"]} src={logo} alt="Site log" /></Link>
          <div className={styles["header-desktop__leftmenu"]}><Link to="/price">料金プラン</Link></div>
          <div className={styles["header-desktop__leftmenu"]}><Link to="/question">よくある質問</Link></div>
          <div className={styles["header-desktop__rightmenu"]}><Link to="./signup" className={styles["header-desktop__button--fill"]}>新規作成</Link></div>
          <div><Link to="./login" className={styles["header-desktop__button--white"]}>ログイン</Link></div>
        </div>
        <div className={styles["header-mobile"]}>
          <input className={styles["header-mobile__checkbox"]} id="drawerCheckbox" type="checkbox" />
          <label className={styles["header-mobile__icon"]} htmlFor="drawerCheckbox"><span className={styles["header-mobile__icon-parts"]}></span></label>
          <label className={styles["header-mobile__overlay"]} htmlFor="drawerCheckbox"></label>
          <nav className={styles["header-mobile__menu"]}>
            <div className={styles["header-mobile__logo"]}><img className="header-mobile__logo_img" src={logo_sm} alt="Site log" /></div>
            <ul>
              <li className={styles["header-mobile__item"]}><Link className="header-mobile__item-inner" to="./login">ログイン</Link></li>
              <li className={styles["header-mobile__item"]}><Link className="header-mobile__item-inner" to="./signup">新規アカウント作成</Link></li>
              <li className={styles["header-mobile__item"]}><Link className="header-mobile__item-inner" to="/question">よくある質問</Link></li>
              <li className={styles["header-mobile__item"]}><Link className="header-mobile__item-inner" to="/">問い合わせ</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
