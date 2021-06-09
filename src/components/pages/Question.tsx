import React from 'react';
import styles from '../../assets/scss/pages/question.module.scss'
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const Question: React.FC = () => {

  return (
    <>
      <Header />
      <div className={styles['container']}>
        <div className={styles['question__title']}>よくある質問</div>

        <div className={styles['question__box']}>
          <div className={styles['question__box--q']}>ゲムフレは無料ですか？</div>
          <div className={styles['question__box--a']}>はい。現在は無料で投稿が可能です。</div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Question;