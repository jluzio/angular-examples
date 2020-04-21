import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, from } from 'rxjs'
import { environment } from '@/environments/environment'
import firebase, { firestore } from 'firebase'
import { Recipe } from './recipes/recipe'
import { tap } from 'rxjs/operators'
import { FirebaseService } from './firebase.service'

@Injectable()
export class StorageService {
  private apiConfig = environment.apiConfig['recipe-book']
  private db: typeof firebase = null
  private resourceId = (resourceKey: string) => `angular-examples/recipe-book/${resourceKey}`

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.db.subscribe(fb => this.db = fb)
  }

  private get collectionRef() {
    return this.db.firestore().collection('/angular-examples-recipe-book')
  }
  private get recipesRef() {
    return firebase.firestore().doc('/angular-examples-recipe-book/recipes')
  }

  public getRecipes(): Observable<Recipe[]> {
    this.collectionRef.get().then(v => {
      console.log('c.1', v)
      console.log('c.2', v.docs)
      console.log('c.3', v.size)
    })
    this.recipesRef.get().then(v => {
      console.log('r.1', v)
      console.log('r.2', v.data())
    })
    return from(this.recipesRef.get().then(data => data.data() as Recipe[] ?? []))
      .pipe(
        tap(v => console.log('getRecipes', v))
      )
  }

  public postRecipes(recipes: Recipe[]): Observable<void> {
    return from(this.recipesRef.set(recipes))
      .pipe(
        tap(v => console.log('postRecipes', v))
      )
  }
}
