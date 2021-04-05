import * as firebase from '@firebase/testing'
import * as fs from 'fs'
import { randomID } from './testHelper'

const projectID = 'test-project'
const databaseName = 'test-firestore'
const rules = fs.readFileSync('./firestore.rules', 'utf8')

// firestore client for admin
const adminDB = firebase.initializeAdminApp({ projectId: projectID, databaseName })

type Auth = {
  uid?: string,
  [key: string]: any
}

const clientDB = (auth?: Auth) => firebase.initializeTestApp({ projectId: projectID, databaseName, auth }).firestore()

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

describe('/user/{uid}/followings/{uid}', () => {

  type followings_type = {
    create_at: any,
    userID: any,
  }

  const testdata_followings: followings_type = {
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
    userID: randomID().slice(0, 28)
  }

  describe('Create', () => {
    describe('正常系', () => {

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('ログインユーザーが正常データの登録', async () => {
        await firebase.assertSucceeds(db
          .collection('user')
          .doc(userID)
          .collection('followings')
          .doc(testdata_followings.userID)
          .set(testdata_followings)
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
          .collection('followings')
          .doc(testdata_followings.userID)
          .set(testdata_followings))
      })

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('必須項目が抜けている（登録日時)', async () => {
        const { create_at, ...testdata } = testdata_followings
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('followings')
          .doc(testdata_followings.userID)
          .set(testdata))
      })

      it('登録日に文字列を挿入', async () => {
        const { ...testdata } = testdata_followings
        testdata.create_at = "2021/04/01"
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('followings')
          .doc(testdata_followings.userID)
          .set(testdata))
      })
    })
  })
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


describe('/user/{uid}/posts/{uid}/comments/{random}', () => {

  type comments_type = {
    comment: any,
    create_at: any,
    displayName: any,
    photoUrl: any,
  }

  const testdata_comments: comments_type = {
    comment: "commentscomments",
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
    displayName: "displayNameDsplayName",
    photoUrl: "photoUrlphtourl",
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
          .collection('comments')
          .doc(randomID())
          .set(testdata_comments)
        )
      })

      it('本人のアカウント以外でログイン後、正常データ登録', async () => {
        await firebase.assertSucceeds(db
          .collection('user')
          .doc(randomID().slice(0, 28))
          .collection('posts')
          .doc(randomID())
          .collection('comments')
          .doc(randomID())
          .set(testdata_comments)
        )
      })
    })

    describe('異常系', () => {

      it('ログインせずに正常データの登録', async () => {
        const db = clientDB()
        await firebase.assertFails(db
          .collection('user')
          .doc(randomID().slice(0, 28))
          .collection('posts')
          .doc(randomID())
          .collection('comments')
          .doc(randomID())
          .set(testdata_comments))
      })

      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('必須項目が抜けている（コメント)', async () => {
        const { comment, ...testdata } = testdata_comments
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .collection('comments')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('必須項目が抜けている（登録日時)', async () => {
        const { create_at, ...testdata } = testdata_comments
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .collection('comments')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('必須項目が抜けている（コメントしたユーザー)', async () => {
        const { displayName, ...testdata } = testdata_comments
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .collection('comments')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('必須項目が抜けている（コメントしたユーザーのアバター)', async () => {
        const { photoUrl, ...testdata } = testdata_comments
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .collection('comments')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('登録日に文字列を挿入', async () => {
        const { ...testdata } = testdata_comments
        testdata.create_at = "2021/04/01"
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .collection('comment')
          .doc(randomID())
          .set(testdata)
        )
      })

    })
  })
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

    describe('異常系', () => {

      it('ログインせずに正常データの登録', async () => {
        const db = clientDB()
        await firebase.assertFails(db
          .collection('user')
          .doc(randomID().slice(0, 28))
          .collection('posts')
          .doc(randomID())
          .collection('nices')
          .doc(randomID())
          .set(testdata_nices))
      })


      const userID = randomID().slice(0, 28)
      const db = clientDB({ uid: userID })

      it('必須項目が抜けている（ユーザーID)', async () => {
        const { userID, ...testdata } = testdata_nices
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .collection('nices')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('必須項目が抜けている（登録日時)', async () => {
        const { create_at, ...testdata } = testdata_nices
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .collection('nices')
          .doc(randomID())
          .set(testdata)
        )
      })

      it('登録日に文字列を挿入', async () => {
        const { ...testdata } = testdata_nices
        testdata.create_at = "2021/04/01"
        await firebase.assertFails(db
          .collection('user')
          .doc(userID)
          .collection('posts')
          .doc(randomID())
          .collection('nices')
          .doc(randomID())
          .set(testdata)
        )
      })

    })
  })
})