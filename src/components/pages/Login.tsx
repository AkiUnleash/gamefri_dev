import React from 'react';
// Component
import LoginForm from '../organisms/Loginform';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const Login = (): JSX.Element => {
  return (
    <>
      <Header />
      <LoginForm />
      <Footer />
    </>
  );
};

export default Login;