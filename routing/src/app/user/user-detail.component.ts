import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-detail',
    template: `
      <h3>Some user Details</h3>
      <a routerLink="..">User</a>
      |
      <a (click)="onNavigate()">Home</a>
    `
})
export class UserDetailComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {
        console.log("OnInit");
    }

    onNavigate() {
        this.router.navigateByUrl("/?qParam=value2");
    }
}
