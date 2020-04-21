import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../comment';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject, of } from 'rxjs';
import {map, distinctUntilChanged, switchMap, timeout, catchError} from 'rxjs/operators'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  @Input() recipeId: number;
  comments: Comment[];
  commentsSubject = new Subject<number>()

  constructor(private commentService: CommentService, private route: ActivatedRoute) { 
    this.commentsSubject
      .pipe(
        distinctUntilChanged(),
        switchMap(recipeId => this.commentService.getComments(recipeId)
            .pipe(
              timeout(2000),
              catchError(err => {
                console.log('catchError: ', err)
                return of([])
              })
            )
          )
      )
      .subscribe(
        data => {
          console.log('get data', this.recipeId)
          this.comments = data
        },
        error => {
          console.log(`Unable to get comments for ${this.recipeId}`, error)
          this.comments = []
        }
      )
  }

  ngOnChanges() {
    this.commentsSubject.next(this.recipeId)
  }
}
