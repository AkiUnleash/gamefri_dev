import React from 'react';
// Component
import Header from '../organisms/Header_in';
import Footer from '../organisms/Footer';
import DiaryWriteForm from '../organisms/Diarywriteform';

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <DiaryWriteForm />
    </>
  );
};

export default Login;