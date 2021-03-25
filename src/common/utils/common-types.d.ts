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
  create_at?: firebase.firestore.FieldValue
  update_at?: firebase.firestore.FieldValue
}

interface diarywrite {
  title: string,
  body: string,
  gamename: string,
  attachimage: string,
  create_at?: firebase.firestore.FieldValue
  update_at?: firebase.firestore.FieldValue
}