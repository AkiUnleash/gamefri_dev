import { db, auth, storage } from '../firebase/firebase'

// Firestoreにデータを保存
export const dataAdd = (data: {}, colection: string, documents: string) => {
  const reference = db.collection(colection).doc(documents)
  console.log(data);
  reference.set(data)
}

// Firebase strageにイメージを保存
export const imageAdd = async (path: string, fileName: string, imageFile: File) => {
  // ランダムファイル名
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

export const updateProfile = async (displayName: string, photoURL: string) => {

  await auth.currentUser?.updateProfile({
    displayName: displayName,
    photoURL: photoURL,
  });

  console.log("displayname", auth.currentUser?.displayName);

}

export const dataInport = async (colectionName: string, documentName: string) => {
  const getData = db.collection(colectionName).doc(documentName)
  return getData
}

export const subDataInport = (colectionName: string, documentName: string, subColectionName: string) => {
  return db.collection(colectionName).doc(documentName).collection(subColectionName)
}