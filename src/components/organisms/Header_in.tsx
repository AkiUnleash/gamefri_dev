import React from 'react';
import styles from '../../assets/scss/header_in.module.scss';
import img_logo_sm from '../../assets/images/logo_sm.svg'
import img_home from '../../assets/images/header_in/home.svg'
import img_notifications from '../../assets/images/header_in/notifications.svg'
import img_search from '../../assets/images/header_in/search.svg'
import img_menu from '../../assets/images/header_in/menu.svg'
import img_avatar from '../../assets/images/profile/avatar.png'
import { logout } from '../../common/backend/model'

const Header = (): JSX.Element => {
  return (
    <header className={styles["header-in"]}>
      <div className={styles["header-in__logo"]}>
        <img className={styles["header-in__logoimg"]} src={img_logo_sm} alt="Logo" />
      </div>
      <div className={styles["header-in__button"]}>
        <a href="./home"><img className={styles["header-in__button--home"]} src={img_home} alt="Home button" /></a>
        <a href=""><img className={styles["header-in__button--notifications"]} src={img_notifications} alt="Notifications button" /></a>
        <a href=""><img className={styles["header-in__button--search"]} src={img_search} alt="Search button" /></a>

        <label className={styles["side-menu__icon"]} htmlFor="drawerCheckbox"><img className={styles["side-menu__button--menu"]} src={img_menu} alt="Menu button" /></label>
        <input className={styles["side-menu__checkbox"]} id="drawerCheckbox" type="checkbox" />
        <label className={styles["side-menu__overlay"]} htmlFor="drawerCheckbox"></label>

        <nav className={styles["side-menu__menu"]}>
          <div className={styles["side-menu__logo"]}><img className={styles["side-menu__logo_img"]} src={img_avatar} alt="Login user avatar" /></div>
          <ul>
            <li className={styles["side-menu__item"]}><a className="side-menu__item-inner" href="./login.html">マイページ</a></li>
            <li className={styles["side-menu__item"]}><a className="side-menu__item-inner" href="./singup.html">設定とプライバシー</a></li>
            <li className={styles["side-menu__item"]}><a href="/login" className="side-menu__item-inner" onClick={async () => await logout()}>ログアウト</a></li>
          </ul>
        </nav>
      </div>
    </header >
  );
};

export default Header;
