import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { Recipe } from '../../recipes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rb-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() recipeId: number;
  comments: Comment[];

  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.recipeId = params['id'];
        
        console.log("CommentListComponent loading comments for recipeId=" + this.recipeId)
        this.commentService.getComments(this.recipeId).subscribe(
          data => this.comments = data,
          error => console.log(`Unable to get comments for ${this.recipeId}`)
        );        
      }   
    );
    
  }

}
