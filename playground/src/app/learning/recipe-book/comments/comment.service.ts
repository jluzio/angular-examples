import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { Comment } from './comment';
import { shareReplay, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommentService {
  private commentsListUrl = environment.restApiUrl + "/comments";
  private cache: Record<number, Observable<Comment[]>> = {}

  constructor(private httpClient: HttpClient) { }

  getComments(recipeId: number): Observable<Comment[]> {
    if (!this.cache[recipeId]) {
      this.cache[recipeId] = this.httpClient.get<Comment[]>(this.commentsListUrl + "?postId=" + recipeId).pipe(
        shareReplay(1),
        catchError(err => {
          delete this.cache[recipeId]
          return []
        })
      )
    }
    return this.cache[recipeId]
  }
}
