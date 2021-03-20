import React from 'react';
import styles from '../../assets/scss/header_in.module.scss';
import img_logo_sm from '../../assets/images/logo_sm.svg'
import img_home from '../../assets/images/header_in/home.svg'
import img_notifications from '../../assets/images/header_in/notifications.svg'
import img_search from '../../assets/images/header_in/search.svg'
import img_menu from '../../assets/images/header_in/menu.svg'

const Header = (): JSX.Element => {
  return (
    <header className={styles["header-in"]}>
      <div className={styles["header-in__logo"]}>
        <img className={styles["header-in__logoimg"]} src={img_logo_sm} />
      </div>
      <div className={styles["header-in__button"]}>
        <a href=""><img className={styles["header-in__button--home"]} src={img_home} /></a>
        <a href=""><img className={styles["header-in__button--notifications"]} src={img_notifications} /></a>
        <a href=""><img className={styles["header-in__button--search"]} src={img_search} /></a>
        <a href=""> <img className={styles["header-in__button--menu"]} src={img_menu} /></a>
      </div>
    </header>
  );
};

export default Header;
