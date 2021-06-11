import React from 'react';
import InquiryForm from '../organisms/InquiryForm'
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';


const Inquiry: React.FC = () => {

  return (
    <>
      <Header />
      <InquiryForm />
      <Footer />
    </>
  );
};

export default Inquiry;