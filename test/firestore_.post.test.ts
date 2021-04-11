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

describe('/user/{uid}/posts/{uid}', () => {

  type posts_type = {
    attachimage: any
    body: any
    create_at: any
    gamename: any
    nicecount: any
    title: any
  }

  const testdata_posts: posts_type = {
    attachimage: "http://example.com/attachimage.jpeg",
    body: "bodybodybody",
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
    gamename: "gamenamegamename",
    nicecount: 0,
    title: "titletitle"
  }

  describe('Create', () => {
    describe('正常系', () => {

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('ログインユーザーが正常データの登録', async () => {
        await firebase.assertSucceeds(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .set(testdata_posts)
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
          .collection('posts')
          .doc(randomID())
          .set(testdata_posts)
        )
      })

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('必須項目が抜けている（日記本文)', async () => {
        const { body, ...testdata } = testdata_posts
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('必須項目が抜けている（登録日時)', async () => {
        const { create_at, ...testdata } = testdata_posts
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('必須項目が抜けている（日記タイトル)', async () => {
        const { body, ...testdata } = testdata_posts
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('登録日に文字列を挿入', async () => {
        const { ...testdata } = testdata_posts
        testdata.create_at = "2021/04/01"
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .set(testdata)
        )
      })

    })
  })
})
