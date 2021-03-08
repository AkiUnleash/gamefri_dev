import React from 'react';
// Component
import SingupForm from '../organisms/Singupform';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

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