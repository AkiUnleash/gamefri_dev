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


describe('/user/{uid}/notification/{id}', () => {

  type notifications_type = {
    avatarurl: any,
    create_at: any,
    message: any,
    nickname: any
    profileid: any,
    link: any
  }

  const testdata_notifications: notifications_type = {
    avatarurl: "http://example.com/avatarurl",
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
    message: "message/message",
    nickname: "nickname",
    profileid: "profileid",
    link: "./user/aaa"
  }

  describe('Create', () => {
    describe('正常系', () => {

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('ログインユーザーが正常データの登録', async () => {
        await firebase.assertSucceeds(db
          .collection('user')
          .doc(userID)
          .collection('notifications')
          .doc(randomID())
          .set(testdata_notifications)
        )
      })
    })

    describe('異常系', () => {

      it('ログインせずに正常データの登録', async () => {
        const userID = randomID().slice(0, 28)
        const db = clientDB()
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('notifications')
          .doc(randomID())
          .set(testdata_notifications)
        )
      })

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('必須項目が抜けている（登録日時)', async () => {
        const { create_at, ...testdata } = testdata_notifications
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('notifications')
          .doc(randomID())
          .set(testdata))
      })

      it('必須項目が抜けている（メッセージ)', async () => {
        const { message, ...testdata } = testdata_notifications
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('notifications')
          .doc(randomID())
          .set(testdata))
      })

      it('必須項目が抜けている（ニックネーム)', async () => {
        const { nickname, ...testdata } = testdata_notifications
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('notifications')
          .doc(randomID())
          .set(testdata))
      })

      it('必須項目が抜けている（ユーザーID)', async () => {
        const { profileid, ...testdata } = testdata_notifications
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('notifications')
          .doc(randomID())
          .set(testdata))
      })

      it('登録日に文字列を挿入', async () => {
        const { ...testdata } = testdata_notifications
        testdata.create_at = "2021/04/01"
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('notifications')
          .doc(randomID())
          .set(testdata))
      })
    })
  })
})
