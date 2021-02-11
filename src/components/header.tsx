import * as React from 'react';
import * as styles from '../assets/scss/header.scss';
import * as logo from '../assets/images/logo.svg'
import * as logo_sm from '../assets/images/logo_sm.svg'

const Header = (): JSX.Element => {
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-desktop"]}><img className={styles["header-desktop__img"]} src={logo} />
          <div className={styles["header-desktop__leftmenu"]}><a>料金プラン</a></div>
          <div className={styles["header-desktop__leftmenu"]}><a>よくある質問</a></div>
          <div className={styles["header-desktop__rightmenu"]}><a className={styles["header-desktop__button--fill"]} href="./singup.html">新規作成</a></div>
          <div><a className={styles["header-desktop__button--white"]} href="./login.html">ログイン</a></div>
        </div>
        <div className={styles["header-mobile"]}>
          <input className={styles["header-mobile__checkbox"]} id="drawerCheckbox" type="checkbox" />
          <label className={styles["header-mobile__icon"]} htmlFor="drawerCheckbox"><span className="header-mobile__icon-parts"></span></label>
          <label className={styles["header-mobile__overlay"]} htmlFor="drawerCheckbox"></label>
          <nav className={styles["header-mobile__menu"]}>
            <div className={styles["header-mobile__logo"]}><img className="header-mobile__logo_img" src={logo_sm} /></div>
            <ul>
              <li className={styles["header-mobile__item"]}><a className="header-mobile__item-inner" href="./login.html">ログイン</a></li>
              <li className={styles["header-mobile__item"]}><a className="header-mobile__item-inner" href="./singup.html">新規アカウント作成</a></li>
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
