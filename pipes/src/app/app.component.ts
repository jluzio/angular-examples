import { Component } from '@angular/core';

@Component({
  selector: 'pipes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipes works!';
  items = ["one", "two", "three"];
  asyncData = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Async data"), 2000)
  });

  addItem(item: string) {
    console.log("addItem");
    let newItems: string[] = [];
    this.items.forEach( i => { newItems.push(i) } );
    newItems.push(item);
    this.items = newItems;
  }

  clearItems() {
    this.items = [];
  }

}
