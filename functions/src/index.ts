// Firebase Functionsを使用するための初期値
import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";
import { createTransport } from 'nodemailer'

// FireStoreを扱うための初期値
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()

// フォローしたときに、日記をテンプレートにまとめる。
exports.copyPostWhenFollowings = functions.firestore
  .document("user/{userId}/followings/{followingsID}")
  .onCreate((change, context) => {

    // パラメータの確認
    console.log(`userID: ${context.params.userId} wrote.`);
    console.log(`FollowingsID: ${context.params.followingsID} wrote.`);

    firestore.collection("user")
      .doc(context.params.followingsID)
      .collection("posts")
      .get()
      .then(query => {
        query.forEach((doc) => {

          // パラメータ確認
          console.log(
            {
              postID: doc.id,
              userID: doc.data().userID,
              create_at: doc.data().create_at,
            }
          );

          firestore.collection("user")
            .doc(context.params.userId)
            .collection("timeline")
            .doc(doc.id)
            .set(
              {
                postID: doc.id,
                userID: doc.data().userID,
                create_at: doc.data().create_at,
              }
            );
        });
      });
  });

// 日記投稿時に、フォロワーのタイムラインへ投稿日記をコピー
exports.copyToFollowersWhenPosting = functions.firestore
  .document("user/{userId}/posts/{postsId}")
  .onCreate((change, context) => {

    // パラメータの確認
    console.log(`userID: ${context.params.userId} wrote.`);
    console.log(`postID: ${context.params.postsId} wrote.`);

    // タイムラインへコピー
    firestore.collection("user")
      .doc(context.params.userId)
      .collection("followers")
      .get()
      .then(query => {
        query.forEach((doc) => {

          // パラメータ確認
          console.log(
            {
              postID: change.id,
              userID: context.params.userId,
              create_at: change.data().create_at,
            }
          );

          firestore.collection("user")
            .doc(doc.id)
            .collection("timeline")
            .doc(change.id)
            .set(
              {
                postID: change.id,
                userID: context.params.userId,
                create_at: change.data().create_at,
              }
            );
        });
      });

    // Alogliaへ投稿日記をクローン
    const ALGOLIA_INDEX = "posts"
    const ALGOLIA_ID = functions.config().algolia.app_id
    const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_api_key
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const data = change.data();
    data.objectID = change.id;
    const index = client.initIndex(ALGOLIA_INDEX);
    return index.saveObject(data);

  });

// ユーザー情報追加時に、Algoliaも追加
exports.createToUser = functions.firestore
  .document("user/{userId}")
  .onCreate((change, context) => {

    // Alogliaへ投稿日記をクローン
    const ALGOLIA_INDEX = "user"
    const ALGOLIA_ID = functions.config().algolia.app_id
    const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_api_key
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const data = change.data();
    data.objectID = change.id;
    const index = client.initIndex(ALGOLIA_INDEX);
    return index.saveObject(data);

  })

// ユーザー情報更新時に、Algoliaも更新
exports.updateToUser = functions.firestore
  .document("user/{userId}")
  .onUpdate((change, context) => {

    // Alogliaへ投稿日記をクローン
    const ALGOLIA_INDEX = "user"
    const ALGOLIA_ID = functions.config().algolia.app_id
    const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_api_key
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const data = change.after.data();
    data.objectID = change.after.id;
    const index = client.initIndex(ALGOLIA_INDEX);
    return index.saveObject(data);

  })

// 問い合わせメール
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().gmail.adminemail;

// 送信に使用するメールサーバーの設定
const mailTransport = createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// 管理者用のメールテンプレート
const adminContents = (data: any) => {
  return `以下内容でホームページよりお問い合わせを受けました。
お名前：
${data.name}
メールアドレス：
${data.email}
タイトル：
${data.title}
内容：
${data.contents}
`;
};

exports.sendMail = functions.https.onCall((data, context) => {
  // メール設定
  const adminMail = {
    from: gmailEmail,
    to: adminEmail,
    subject: `ゲムフレお問い合わせ｜${data.title}`,
    text: adminContents(data)
  };

  // 管理者へのメール送信
  mailTransport.sendMail(adminMail, (err, info) => {
    console.log('Send!!!!');
    if (err) {
      console.log('Error!!!!');
      return console.error(`send failed. ${err}`);
    }
    return console.log("send success.");
  });
});