import * as firebase from '@firebase/testing'
import * as fs from 'fs'


export const projectID = 'test-project'
export const rules = fs.readFileSync('./firestore.rules', 'utf8')
const databaseName = 'test-firestore'

// firestore client for admin
export const adminDB = firebase.initializeAdminApp({ projectId: projectID, databaseName })

type Auth = {
  uid?: string,
  [key: string]: any
}

export const clientDB = (auth?: Auth) => firebase.initializeTestApp({ projectId: projectID, databaseName, auth }).firestore()
