import React from 'react';
// assets
import styles from '../../assets/scss/home.scss';
// Component
import Diarylist from '../organisms/Diarylist';
import Header from '../organisms/Header_in';



const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles["cardaria"]}>
        <Diarylist />
      </div>
    </>
  );
};

export default Home;