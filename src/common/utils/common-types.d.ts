import firebase from "firebase/app";

type Nullable<T> = T | null;
type Undefined<T> = T | undefined;

interface profile {
  profileid: string;
  nickname: string;
  introduction: string;
  gender: string;
  playgame: string;
  timestart: string;
  timeend: string;
  avatarurl: string;
  coverurl: string;
  userID: string
  create_at?: firebase.firestore.FieldValue
  update_at?: firebase.firestore.FieldValue
}

interface diarywrite {
  title: string,
  body: string,
  gamename: string,
  attachimage: string,
  nicecount: number,
  profileid: string,
  avatarurl: string,
  nickname: string,
  userID: string,
  create_at?: firebase.firestore.FieldValue
  update_at?: firebase.firestore.FieldValue
  delete_at?: firebase.firestore.FieldValue
}

interface diarycomments {
  photoUrl: string,
  displayName: string,
  comment: string,
  create_at?: firebase.firestore.FieldValue
}

interface follow {
  userID: string
  create_at?: firebase.firestore.FieldValue
}

interface nice {
  userID: string,
  create_at?: firebase.firestore.FieldValue
}

interface notification {
  avatarurl: string,
  message: string,
  nickname: string,
  profileid: string,
  link: string,
  create_at?: firebase.firestore.FieldValue
}

interface timeline {
  userID: string,
  postID: string,
  create_at?: firebase.firestore.FieldValue
}