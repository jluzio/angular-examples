import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { environment } from '@/environments/environment';
import { Comment } from './comment';

@Injectable()
export class CommentService {
  private commentsListUrl = environment.restApiUrl + "/comments";

  constructor(private restService: RestService) { }

  getComments(recipeId: number) {
    return this.restService.getResource<Comment[]>(this.commentsListUrl + "?postId=" + recipeId);
  }
}
