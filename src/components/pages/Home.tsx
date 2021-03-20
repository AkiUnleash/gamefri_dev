import React from 'react';
import { useSelector } from 'react-redux'
// assets
import styles from '../../assets/scss/home.module.scss';
// Component
import Diarylist from '../organisms/Diarylist';
import Header from '../organisms/Header_in';
// state
import { selectUser } from "../../common/state/userSlice"


const Home: React.FC = () => {
  const user = useSelector(selectUser)

  return (
    <>
      <Header />
      {user.uid ?
        (<div className={styles["cardaria"]}>
          <Diarylist />
        </div>) : ""}
    </>
  );
};

export default Home;