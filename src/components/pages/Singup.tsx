import React, { useEffect } from 'react';
import SingupForm from '../organisms/Singupform';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { loginChack_done } from '../../common/backend/model'

const Singup: React.FC = () => {

  useEffect(() => {
    // 既にログイン済みの場合はHomeへ移動
    loginChack_done()
    return () => loginChack_done()
  }, [])

  return (
    <>
      <Header />
      <SingupForm />
      <Footer />
    </>
  );
};

export default Singup;