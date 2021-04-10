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

describe('/user/{uid}/posts/{uid}/nices/{random}', () => {

  type nices_type = {
    create_at: any,
    userID: any,
  }

  const testdata_nices: nices_type = {
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
    userID: randomID().slice(0, 28),
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
          .collection('nices')
          .doc(randomID())
          .set(testdata_nices)
        )
      })

      it('本人のアカウント以外でログイン後、正常データ登録', async () => {
        await firebase.assertSucceeds(db
          .collection('user')
          .doc(randomID().slice(0, 28))
          .collection('posts')
          .doc(randomID())
          .collection('nices')
          .doc(randomID())
          .set(testdata_nices)
        )
      })
    })

    // describe('異常系', () => {

    //   it('ログインせずに正常データの登録', async () => {
    //     const db = clientDB()
    //     await firebase.assertFails(db
    //       .collection('user')
    //       .doc(randomID().slice(0, 28))
    //       .collection('posts')
    //       .doc(randomID())
    //       .collection('nices')
    //       .doc(randomID())
    //       .set(testdata_nices))
    //   })


    //   const userID = randomID().slice(0, 28)
    //   const db = clientDB({ uid: userID })

    //   it('必須項目が抜けている（ユーザーID)', async () => {
    //     const { userID, ...testdata } = testdata_nices
    //     await firebase.assertFails(db
    //       .collection('user')
    //       .doc(userID)
    //       .collection('posts')
    //       .doc(randomID())
    //       .collection('nices')
    //       .doc(randomID())
    //       .set(testdata)
    //     )
    //   })

    //   it('必須項目が抜けている（登録日時)', async () => {
    //     const { create_at, ...testdata } = testdata_nices
    //     await firebase.assertFails(db
    //       .collection('user')
    //       .doc(userID)
    //       .collection('posts')
    //       .doc(randomID())
    //       .collection('nices')
    //       .doc(randomID())
    //       .set(testdata)
    //     )
    //   })

    //   it('登録日に文字列を挿入', async () => {
    //     const { ...testdata } = testdata_nices
    //     testdata.create_at = "2021/04/01"
    //     await firebase.assertFails(db
    //       .collection('user')
    //       .doc(userID)
    //       .collection('posts')
    //       .doc(randomID())
    //       .collection('nices')
    //       .doc(randomID())
    //       .set(testdata)
    //     )
    //   })

    // })
  })
})