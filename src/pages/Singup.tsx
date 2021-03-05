import React from 'react';
// Component
import SingupForm from '../components/singupform';
import Header from '../components/header';
import Footer from '../components/footer';

const Singup = (): JSX.Element => {
  return (
    <>
      <Header />
      <SingupForm />
      <Footer />
    </>
  );
};

export default Singup;