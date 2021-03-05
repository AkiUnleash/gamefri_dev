import React from 'react';
// Component
import LoginForm from '../components/loginform';
import Header from '../components/header';
import Footer from '../components/footer';

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