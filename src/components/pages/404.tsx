import React from 'react';
import styles from '../../assets/scss/pages/404.module.scss'
import logo from '../../assets/images/logo.svg'

const Singup: React.FC = () => {

  return (
    <div className={styles['contaner']}>
      <img className={styles['logo']} src={logo} alt="logo" />
      <div className={styles['message']}>このページは存在しません。</div>
      <a href="./" className={styles['link']}>トップページへ移動する</a>
    </div>
  );
};

export default Singup;