import { Injectable } from '@angular/core'
import firebase from 'firebase'
import { Recipe } from './recipes/recipe'
import { FirebaseAppService } from './firebase-app.service'

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

type App = firebase.app.App

@Injectable()
export class StorageService {

  constructor(private firebaseAppService: FirebaseAppService) {
  }

  private get firebaseApp() {
    return this.firebaseAppService.connect()
  }

  private refs = {
    recipesRef: (app: App) => app.firestore().collection(this.collectionId('recipes'))
  }

  private collectionId = (collectionId: string) => `angular-recipes:${collectionId}`
  private docId = (collectionId: string, docId: string) => `${this.collectionId(collectionId)}/${docId}`


  async getRecipes(): Promise<Recipe[]> {
    const app = await this.firebaseApp
    return this.refs.recipesRef(app)
      .withConverter(recipeConverter)
      .get()
      .then(snapshot => snapshot.docs.map(d => d.data()))

  }

  async postRecipes(recipes: Recipe[]): Promise<void> {
    const app = await this.firebaseApp
    const promises = recipes.map(r => {
      return this.refs.recipesRef(app)
        .doc(r.id.toString())
        .withConverter(recipeConverter)
        .set(r)
    })
    return Promise.all(promises).then(v => { })
  }
}
