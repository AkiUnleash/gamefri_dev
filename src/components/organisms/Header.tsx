import React from 'react';
import styles from '../../assets/scss/organisms/header.module.scss';
import logo from '../../assets/images/logo.svg'
import logo_sm from '../../assets/images/logo_sm.svg'

const Header: React.FC = () => {
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-desktop"]}><a href="./"><img className={styles["header-desktop__img"]} src={logo} alt="Site log" /></a>
          <div className={styles["header-desktop__leftmenu"]}><a href="./">料金プラン</a></div>
          <div className={styles["header-desktop__leftmenu"]}><a href="./">よくある質問</a></div>
          <div className={styles["header-desktop__rightmenu"]}><a className={styles["header-desktop__button--fill"]} href="./signup">新規作成</a></div>
          <div><a className={styles["header-desktop__button--white"]} href="./login">ログイン</a></div>
        </div>
        <div className={styles["header-mobile"]}>
          <input className={styles["header-mobile__checkbox"]} id="drawerCheckbox" type="checkbox" />
          <label className={styles["header-mobile__icon"]} htmlFor="drawerCheckbox"><span className={styles["header-mobile__icon-parts"]}></span></label>
          <label className={styles["header-mobile__overlay"]} htmlFor="drawerCheckbox"></label>
          <nav className={styles["header-mobile__menu"]}>
            <div className={styles["header-mobile__logo"]}><img className="header-mobile__logo_img" src={logo_sm} alt="Site log" /></div>
            <ul>
              <li className={styles["header-mobile__item"]}><a className="header-mobile__item-inner" href="./login">ログイン</a></li>
              <li className={styles["header-mobile__item"]}><a className="header-mobile__item-inner" href="./signup">新規アカウント作成</a></li>
              <li className={styles["header-mobile__item"]}><a className="header-mobile__item-inner" href="/">よくある質問</a></li>
              <li className={styles["header-mobile__item"]}><a className="header-mobile__item-inner" href="/">問い合わせ</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
