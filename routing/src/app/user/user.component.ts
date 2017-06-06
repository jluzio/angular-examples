import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-user-component',
  template: `
      <h1>User Component</h1>
      <a routerLink="detail">Details</a>
      |
      <a (click)="onNavigate()">Home</a>
      <hr>
      id: {{id}}
    `
})
export class UserComponent implements OnDestroy {
  private id: string;
  private paramSubscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.paramSubscription = activatedRoute.params.subscribe(
      (param: any) => this.id = param['id']
    );
  }

  onNavigate() {
    this.router.navigateByUrl("/?qParam=value1");
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
