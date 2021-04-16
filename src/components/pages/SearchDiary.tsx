import React, { useEffect } from 'react';
import Header from '../organisms/Header_in';
import SearchDiaryArea from '../organisms/SearchDiaryArea'
import { loginChack_yat, authenticatedChack, profileDocumentExistence } from "../../common/backend/model"

const SearchAccount: React.FC = () => {
  useEffect(() => {
    // ログイン済みの確認
    loginChack_yat();
    // メール認証確認
    authenticatedChack();
    // プロフィール入力有無確認
    profileDocumentExistence();
    return () => {
      loginChack_yat();
      authenticatedChack();
      profileDocumentExistence();
    }
  })

  return (
    <>
      <Header />
      <SearchDiaryArea />
    </>
  );
};

export default SearchAccount;