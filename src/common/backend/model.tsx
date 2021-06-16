import { db, auth, storage, serverTime } from '../firebase/firebase'
import { profile, diarywrite, diarycomments, follow, nice, notification } from '../utils/common-types'

// 保存場所を指定する型宣言
type place = {
  colection1: string,
  documents1: string,
  colection2?: string,
  documents2?: string,
  colection3?: string,
  documents3?: string,
}

// Firestoreにデータを保存
export const dataAdd = <T extends profile | diarywrite | diarycomments | follow | nice | notification
  , U extends place
  , V extends boolean>(data: T, place: U, timestanp?: V,
) => {

  // タイムスタンプの有無
  if (timestanp) { data['create_at'] = serverTime }

  if (
    place.colection1 && place.documents1 &&
    place.colection2 && place.documents2 &&
    place.colection3 && place.documents3
  ) {

    db.collection(place.colection1)
      .doc(place.documents1)
      .collection(place.colection2)
      .doc(place.documents2)
      .collection(place.colection3)
      .doc(place.documents3).set(data)
    return
  }

  if (
    place.colection1 && place.documents1 &&
    place.colection2 && place.documents2 &&
    place.colection3
  ) {
    db.collection(place.colection1)
      .doc(place.documents1)
      .collection(place.colection2)
      .doc(place.documents2)
      .collection(place.colection3).add(data)
    return
  }

  if (
    place.colection1 && place.documents1 &&
    place.colection2 && place.documents2
  ) {
    db.collection(place.colection1)
      .doc(place.documents1)
      .collection(place.colection2)
      .doc(place.documents2).set(data)
    return
  }

  if (
    place.colection1 && place.documents1 &&
    place.colection2
  ) {
    db.collection(place.colection1)
      .doc(place.documents1)
      .collection(place.colection2).add(data)
    return
  }

  if (place.colection1 && place.documents1) {
    db.collection(place.colection1)
      .doc(place.documents1).set(data)
    return
  }
}

// Firestoreのデータ更新
export const dataUpdate = (data: {}, place: place) => {

  if (
    place.colection1 && place.documents1 &&
    place.colection2 && place.documents2 &&
    place.colection3 && place.documents3
  ) {
    // 更新処理
    const reference = db
      .collection(place.colection1)
      .doc(place.documents1)
      .collection(place.colection2)
      .doc(place.documents2)
      .collection(place.colection3)
      .doc(place.documents3)
    reference.update(data)
    return
  }

  if (
    place.colection1 && place.documents1 &&
    place.colection2 && place.documents2
  ) {
    const reference = db
      .collection(place.colection1)
      .doc(place.documents1)
      .collection(place.colection2)
      .doc(place.documents2)
    reference.update(data)
    return
  }

  if (
    place.colection1 && place.documents1
  ) {
    const reference = db
      .collection(place.colection1)
      .doc(place.documents1)
    reference.update(data)
    return
  }
}

// Firestoreのデータを削除
export const dataDelete = (place: place) => {

  if (
    place.colection1 && place.documents1 &&
    place.colection2 && place.documents2 &&
    place.colection3 && place.documents3
  ) {
    db.collection(place.colection1)
      .doc(place.documents1)
      .collection(place.colection2)
      .doc(place.documents2)
      .collection(place.colection3)
      .doc(place.documents3)
      .delete()
    return
  }

  if (
    place.colection1 && place.documents1 &&
    place.colection2 && place.documents2
  ) {
    db.collection(place.colection1)
      .doc(place.documents1)
      .collection(place.colection2)
      .doc(place.documents2)
      .delete()
    return
  }

  if (
    place.colection1 && place.documents1
  ) {
    db.collection(place.colection1)
      .doc(place.documents1)
      .delete()
    return
  }
}

// Firebase strageにイメージを保存
export const imageAdd = async (path: string, fileName: string, imageFile: File) => {

  // ファイル名をrandomで生成
  const S =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const N = 16
  const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");
  const NewfileName = `${randomChar}_${fileName}`;

  // firebase storagenに保存
  await storage.ref(`${path}/${NewfileName}`).put(imageFile)

  // 保存先のURLを取得
  const url = await storage.ref(`${path}`).child(NewfileName).getDownloadURL() as string;
  return url;
}

// Firebase Authentication のプロフィールを修正
export const updateProfile = async (displayName: string, photoURL: string) => {
  await auth.currentUser?.updateProfile({
    displayName: displayName,
    photoURL: photoURL,
  });
}

// データの取得
export const dataInport = async (colectionName: string, documentName: string) => {
  const getData = db.collection(colectionName).doc(documentName)
  return getData
}

// データの取得（サブ）
export const subDataInport = (colectionName: string, documentName: string, subColectionName: string) => {
  return db.collection(colectionName).doc(documentName).collection(subColectionName)
}

// ログアウト処理
export const logout = (): void => {
  auth.signOut();
}

// ログイン済みの確認
// 認証されていない場合は、ログインページへ転送
export const loginChack_yat = () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      document.location.href = '/login';
    }
  })
}

// ログイン済みの確認
// 認証済みの場合は、ホーム画面へ
export const loginChack_done = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      document.location.href = '/home';
    }
  })
}

// 認証済みのアカウントなのか確認する
// 認証されていない場合は、確認依頼ページへ転送
export const authenticatedChack = () => {

  auth.onAuthStateChanged((user) => {
    if (user) {
      const Verified = auth.currentUser?.emailVerified
      if (!Verified) {
        auth.currentUser?.sendEmailVerification();
        document.location.href = '/signupfinished';
      }
    }
  })
}

// プロフィール入力の終了確認
// 登録が完了されていない場合は、プロフィール入力画面に遷移
export const profileDocumentExistence = () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const doc = await db.collection('user').doc(user.uid).get()
      if (!doc.exists) {
        document.location.href = '/profile';
      }
    }
  })
}
