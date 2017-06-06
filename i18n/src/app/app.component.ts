import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "i18n examples";
  wolves = 0;
  gender = 'f';
  fly = true;
  logo = 'https://angular.io/resources/images/logos/angular/angular.png';
  inc(i: number) {
    this.wolves = Math.min(5, Math.max(0, this.wolves + i));
  }
  male()   { this.gender = 'm'; }
  female() { this.gender = 'f'; }
}