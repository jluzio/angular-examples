import { Injectable } from '@angular/core'
import { Observable, of, from, forkJoin } from 'rxjs'
import firebase from 'firebase'
import { Recipe } from './recipes/recipe'
import { tap, combineAll } from 'rxjs/operators'
import { FirebaseService } from './firebase.service'

const recipeConverter: firebase.firestore.FirestoreDataConverter<Recipe> = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return {
      id: data.id,
      description: data.description,
      imagePath: data.imagePath,
      ingredients: JSON.parse(data.ingredients),
      name: data.name
    }
  },
  toFirestore(recipe) {
    const { description, id, imagePath, ingredients, name } = recipe
    return {
      description,
      id,
      imagePath,
      ingredients: JSON.stringify(ingredients),
      name
    }
  }
}

@Injectable()
export class StorageService {
  private db: firebase.app.App = null
  private collectionId = (collectionId: string) => `angular-recipes:${collectionId}`
  private docId = (collectionId: string, docId: string) => `${this.collectionId(collectionId)}/${docId}`

  constructor(firebaseService: FirebaseService) {
    this.db = firebaseService.app
  }

  private get recipesRef() {
    return this.db.firestore().collection(this.collectionId('recipes'))
  }

  public getRecipes(): Observable<Recipe[]> {
    return from(
      this.recipesRef
        .withConverter(recipeConverter)
        .get()
        .then(snapshot => snapshot.docs.map(d => d.data()))
    )
  }

  public postRecipes(recipes: Recipe[]): Observable<void> {
    const promises = recipes.map(r => {
      return this.recipesRef
        .doc(r.id.toString())
        .withConverter(recipeConverter)
        .set(r)
    })
    return from(Promise.all(promises).then(v => { }))
  }
}
