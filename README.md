# ゲムフレ - GameFre -

![Logo](https://user-images.githubusercontent.com/50258433/114296250-360de280-9ae5-11eb-8aa6-e5f37587c029.png)

オンラインでのゲームフレンドをことを目的とした、ゲーム専用の SNS サービスです。

## 機能

-   アカウント登録（メールアドレス・Google 認証）
-   日記投稿（画像の投稿）
-   ナイス機能（いいね）
-   日記へのコメント機能
-   ユーザー検索機能

## 設計

<a href="https://drive.google.com/file/d/12aOQ-RLpe29DhBFEwlB7hkRPsoGvFO6h/view">全体設計図｜ Drow.io</a>

<a href="https://www.figma.com/file/HSyJdXKzRqMHOUYlPDH3a8/%E7%94%BB%E9%9D%A2%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3-for-WEB?node-id=0%3A1">画面デザイン設計｜ Figma</a>

## テスト

Firebase のセキュリティルールを JEST にて確認。
deploy ブランチへのマージをトリガーに、自動テスト及びデプロイを行う。

## デモ

![demo](https://user-images.githubusercontent.com/50258433/114296595-314a2e00-9ae7-11eb-8e56-c523a3790fd9.gif)

## 使い方

### ローカル起動

```
$ yarn start
```

### ビルド

```
$ yarn build
```

### セキュリティルールテスト

```
$ yarn test:jest
```

## 開発環境

-   Typescript 4.2.3
-   React(Hooks/Redux)
-   SCSS
-   Webpack 5
-   JEST
-   CircleCI
-   Firebase

## 注意事項

-   ポートフォリオとして、現在開発中の Web アプリケーションです。
-   現在開発中です。

## 今後追加予定の機能

-   ホームの無限スクロール
-   Firebase CloudFunction と Algoria での検索機能
-   問い合わせ機能のメール送信
-   ...etc
