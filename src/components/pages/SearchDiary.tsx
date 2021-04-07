import React, { useEffect } from 'react';
// Component
import Header from '../organisms/Header_in';
import { loginChack_yat, authenticatedChack, profileDocumentExistence } from "../../common/backend/model"

const SearchAccount: React.FC = () => {
  useEffect(() => {
    // ログイン済みの確認
    loginChack_yat();
    // メール認証確認
    authenticatedChack();
    // プロフィール入力有無確認
    profileDocumentExistence();
  })

  return (
    <>
      <Header />
    </>
  );
};

export default SearchAccount;