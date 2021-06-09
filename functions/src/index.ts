// Firebase Functionsを使用するための初期値
import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";

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

// 日記投稿時に、フォロワーのタイムラインへ投稿日記をコピー
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