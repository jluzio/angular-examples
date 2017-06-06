import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx'

@Component({
  selector: 'app-home-component',
  template: `
    <h1>
      Home Component!
    </h1>
    <hr>
    {{param}}
  `,
  styles: []
})
export class HomeComponent implements OnDestroy {
  param: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute) {
    this.subscription = this.route.queryParams.subscribe(
      queryParams => this.param = queryParams['qParam']
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
