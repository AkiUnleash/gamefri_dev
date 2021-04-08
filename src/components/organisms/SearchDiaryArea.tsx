import React, { useEffect, useState } from 'react';
import Textfield from '../atoms/Textfield'
import Button from '../atoms/Button'
import Diarycard from '../Molecules/Diarycard'
import styles from '../../assets/scss/search.module.scss'

const SearchAccountArea: React.FC = () => {

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
  })

  return (
    <>
      <div className={styles['container']}>

        <div className={styles["search-select"]}>
          <a href="/search/account" className={styles["search-select__none"]}>アカウント</a>
          <a href="/search/diary" className={styles["search-select__set"]}>日記</a>
        </div>

        <div className={styles["search-bar"]}>
          <div className={styles["search-bar__text"]}>
            <Textfield
              type="text"
              placeholder="検索キーワードを入力しましょう。"
              id={"keyword"}
              value={keyword}
              setValue={setKeyword}
              label="検索バー" />
          </div>

          <div className={styles["search-bar__button"]}>
            <Button
              classDiv="submit__button"
              classButton={"検索"}
              value={"検索"}
              action={() => {
                console.log('aaa');
              }} />
          </div>
        </div>

        <Diarycard key={1}
          title={"ヨツミワドウを倒しまくり！"}
          gametitle={"モンスターハンターライズ"}
          attach_photo={"https://firebasestorage.googleapis.com/v0/b/gamefri-develop.appspot.com/o/posts_attach%2FfoIT3shAcy6G7rw3_S__10895366.jpg?alt=media&token=5b937062-d25f-4de4-ab70-e65f9ae811a9"}
          nicecount={0}
          link={"/AkiUnleash/status/QQcCwAwhWUjeLoSBk9mD"}
          displayName={"アキ・アンリッシュ"}
          avatar_photo={"https://firebasestorage.googleapis.com/v0/b/gamefri-develop.appspot.com/o/avatar%2FZHAPH2PIsxV4vMGr_kokonara121_trim.png?alt=media&token=03199392-e021-4ba8-a142-adcaefbb56a7"}
          create_at={"2021/04/07"}
        />

      </div>

    </>
  );
};

export default SearchAccountArea;