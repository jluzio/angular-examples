import { Injectable } from '@angular/core'
import { environment } from '@/environments/environment'
import firebase from 'firebase'

type App = firebase.app.App

@Injectable()
export class FirebaseAppService {
  appCfg = environment.apiConfig['recipe-book'].firebase

  app: App | null = null

  private initializeApp() {
    const app = firebase.initializeApp(this.appCfg.config)
    // app.analytics()
    return app
  }

  private async signIn(app: App) {
    const { username, password } = this.appCfg.auth
    return app.auth().signInWithEmailAndPassword(username, password)
  }

  async connect() {
    if (!this.app) {
      const app = this.initializeApp()
      await this.signIn(app)
      this.app = app
    }
    return this.app
  }
}
