import React from 'react';
// Component
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
// assets
import styles from '../../assets/scss/signup-finish.scss';

const Massege: React.FC = () => {
  return (
    <>
      <div className={styles["signup-finish"]}>
        <div className={styles["signup-finish__title"]}>ご登録いただき誠に有難うございます。 </div>
        <div>
          <p className={styles["signup-finish__massage"]}>先程ご入力いただきましたメールアドレス宛に、登録をご確認させていただくメールを先程に送付いたしました。。お送りしたメールから、本登録の手続きをお願いいたします。</p>
          <p className={styles["signup-finish__massage"]}>また、メールが届かない場合は再度アカウント作成からお試しください。</p>
        </div>
        <div className={styles["signup-finish__team"]}>ゲムフレ運営チーム一同</div>
      </div>
    </>
  );
}

const Signupfinish: React.FC = () => {
  return (
    <>
      <Header />
      <Massege />
      <Footer />
    </>
  );
};

export default Signupfinish;