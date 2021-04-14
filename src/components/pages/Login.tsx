import React, { useEffect } from 'react';
// Component
import LoginForm from '../organisms/Loginform';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { loginChack_done } from '../../common/backend/model'

const Login: React.FC = () => {
  useEffect(() => {
    // 既にログイン済みの場合はHomeへ移動
    loginChack_done()
  })
  return (
    <>
      <Header />
      <LoginForm />
      <Footer />
    </>
  );
};

export default Login;