import * as firebase from '@firebase/testing'
import { clientDB, projectID, rules } from './firestore_test.main'
import { randomID } from './testHelper'

// Create Database Rules
beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId: projectID, rules });
})

// Create Database
beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: projectID });
})

// Delete Database
afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
})

describe('/user/{uid}', () => {

  type user_type = {
    avatarurl: any,
    coverurl: any,
    create_at: any,
    gender: any,
    introduction: any,
    nickname: any,
    playgame: any,
    profileid: any,
    timeend: any,
    timestart: any
  }

  const testdata_user: user_type = {
    avatarurl: "http://example.com/avatar",
    coverurl: "http://example.com/avatar",
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
    gender: "male",
    introduction: "Hello!!!!",
    nickname: "Nic Name",
    playgame: "Play Game",
    profileid: "Profile id",
    timeend: "08:10",
    timestart: "20:20"
  }

  describe('Create', () => {
    describe('正常系', () => {

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('ログインユーザーが正常データの登録', async () => {
        await firebase.assertSucceeds(db.collection('user').doc(userID).set(testdata_user))
      })

      it('プロフィールIDの桁数しきい値(20桁)', async () => {
        const { ...testdata } = testdata_user
        testdata.profileid = "12345678901234567890"
        await firebase.assertSucceeds(db.collection('user').doc(userID).set(testdata))
      })

    })

    describe('異常系', () => {

      it('ログインせずに正常データの登録', async () => {
        const userID = randomID().slice(0, 28)
        const db = clientDB()
        await firebase.assertFails(db.collection('user').doc(userID).set(testdata_user))
      })

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('必須項目が抜けている（プロフィールID)', async () => {
        const { profileid, ...testdata } = testdata_user
        await firebase.assertFails(db.collection('user').doc(userID).set(testdata))
      })

      it('必須項目が抜けている（登録日時)', async () => {
        const { create_at, ...testdata } = testdata_user
        await firebase.assertFails(db.collection('user').doc(userID).set(testdata))
      })

      it('必須項目が抜けている（ニックネーム))', async () => {
        const { nickname, ...testdata } = testdata_user
        await firebase.assertFails(db.collection('user').doc(userID).set(testdata))
      })

      it('登録日に文字列を挿入', async () => {
        const { ...testdata } = testdata_user
        testdata.create_at = "2021/04/01"
        await firebase.assertFails(db.collection('user').doc(userID).set(testdata))
      })

      it('プロフィールIDの桁数しきい値を超えている(20桁)', async () => {
        const { ...testdata } = testdata_user
        testdata.profileid = "123456789012345678901"
        await firebase.assertFails(db.collection('user').doc(userID).set(testdata))
      })
    })
  })
})
