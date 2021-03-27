import React, { useEffect } from 'react';
// Component
import Header from '../organisms/Header_in';
import DiaryWriteForm from '../organisms/Diarywriteform';
// common
import { loginChack, authenticatedChack, profileDocumentExistence } from "../../common/backend/model"

const DiaryWrite: React.FC = () => {

  useEffect(() => {
    // ログイン済みの確認
    loginChack();
    // メール認証確認
    authenticatedChack();
    // プロフィール入力有無確認
    profileDocumentExistence();
  }, []);

  return (
    <>
      <Header />
      <DiaryWriteForm />
    </>
  );
};

export default DiaryWrite;