import React from 'react';
import { Link } from 'react-router-dom'
import styles from '../../assets/scss/organisms/header_in.module.scss';
import img_logo_sm from '../../assets/images/logo_sm.svg'
import img_home from '../../assets/images/header_in/home.svg'
import img_notifications from '../../assets/images/header_in/notifications.svg'
import img_search from '../../assets/images/header_in/search.svg'
import img_menu from '../../assets/images/header_in/menu.svg'
import img_avatar from '../../assets/images/profile/avatar.png'
import { logout } from '../../common/backend/model'
import { useSelector } from 'react-redux'
import { selectUser } from "../../common/state/userSlice"

const Header: React.FC = () => {
  const user = useSelector(selectUser)
  return (
    <header className={styles["header-in"]}>
      <div className={styles["header-in__logo"]}>
        <img className={styles["header-in__logoimg"]} src={img_logo_sm} alt="Logo" />
      </div>
      <div className={styles["header-in__button"]}>
        <Link to="/home"><img className={styles["header-in__button--home"]} src={img_home} alt="Home button" /></Link>
        <Link to="/notification"><img className={styles["header-in__button--notifications"]} src={img_notifications} alt="Notifications button" /></Link>
        <Link to="/search/account"><img className={styles["header-in__button--search"]} src={img_search} alt="Search button" /></Link>

        <label className={styles["side-menu__icon"]} htmlFor="drawerCheckbox"><img className={styles["side-menu__button--menu"]} src={img_menu} alt="Menu button" /></label>
        <input className={styles["side-menu__checkbox"]} id="drawerCheckbox" type="checkbox" />
        <label className={styles["side-menu__overlay"]} htmlFor="drawerCheckbox"></label>

        <nav className={styles["side-menu__menu"]}>
          <div className={styles["side-menu__logo"]}><img className={styles["side-menu__logo_img"]} src={user.photoUrl || img_avatar} alt="Login user avatar" /></div>
          <ul>
            {/* <li className={styles["side-menu__item"]}><Link to={"/user/" + user.profileID} replace><div className="side-menu__item-inner"> マイページ</div></Link></li> */}
            <li className={styles["side-menu__item"]}><a href={"/user/" + user.profileID} className="side-menu__item-inner"> マイページ</a></li>
            {/* 実装するまで以下は非表示 */}
            {/* <li className={styles["side-menu__item"]}><a className="side-menu__item-inner" href="./">設定とプライバシー</a></li> */}
            <li className={styles["side-menu__item"]}><a href="/login" className="side-menu__item-inner" onClick={async () => await logout()}>ログアウト</a></li>
          </ul>
        </nav>
      </div>
    </header >
  );
};

export default Header;
