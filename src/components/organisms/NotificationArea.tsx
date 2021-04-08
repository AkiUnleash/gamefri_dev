import React, { useEffect, useState } from 'react';
import { db } from '../../common/firebase/firebase'
import Textfield from '../atoms/Textfield'
import Button from '../atoms/Button'
import Diarycard from '../Molecules/Diarycard'
import styles from '../../assets/scss/search.module.scss'

const NotificationArea: React.FC = () => {

  const [keyword, setKeyword] = useState('')


  useEffect(() => {
  }, [])

  return (
    <>
      <div></div>
    </>
  );
};

export default NotificationArea;