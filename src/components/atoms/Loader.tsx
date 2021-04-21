import * as React from 'react';
import styles from '../../assets/scss/atoms/loader.module.scss'


const List: React.FC = () => {

  return (
    <div className={styles["loader-position"]}>
      <div className={styles['loader']}>Loading...</div>
    </div>
  );
};

export default List;