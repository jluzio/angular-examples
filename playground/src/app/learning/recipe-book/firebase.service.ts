import { Injectable } from '@angular/core'
import { environment } from '@/environments/environment'
import firebase from 'firebase'

@Injectable()
export class FirebaseService {
  private appCfg = environment.apiConfig['recipe-book'].firebase
  public app: firebase.app.App

  constructor() {
    this.app = firebase.initializeApp(this.appCfg.config)
    firebase.analytics()
    this.signIn()
  }

  async signIn() {
    const { username, password } = this.appCfg.auth
    return this.app.auth().signInWithEmailAndPassword(username, password)
  }
}
