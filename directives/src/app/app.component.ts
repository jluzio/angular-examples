import { Component } from '@angular/core';

@Component({
  selector: 'dir-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  switch = true;
  items = [1, 2, 3, 4, 5];
  switchValue = 1;

  onSwitch() {
    this.switch = !this.switch;
  }
}
