import { Injectable } from '@angular/core'
import { environment } from '@/environments/environment'
import firebase from 'firebase'
import { ReplaySubject } from 'rxjs'

@Injectable()
export class FirebaseService {
  private apiConfig = environment.apiConfig['recipe-book']
  public db = new ReplaySubject<typeof firebase>()

  constructor() {
    // Initialize Firebase
    firebase.initializeApp(this.apiConfig.firebase)
    firebase.analytics()
    const { username, password } = this.apiConfig.auth
    const login = firebase.auth().signInWithEmailAndPassword(username, password)
    login.then(v => {
      console.log('logged in')
      this.db.next(firebase)
    }).catch(err => {
      console.log('error', err)
      this.db.error(new Error(err))
    })
  }

}
