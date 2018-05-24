import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rb-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  @Input() commentId: number;

  constructor() { }

  ngOnInit() {
  }

}
