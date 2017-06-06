import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
//import 'firebaseui';

import { HttpService } from './http.service';

class User {
  constructor(public name?: string, public email?: string) {}
}

@Component({
  selector: 'http-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'http works!';
  user = new User("JC", "jc@mail.org");
  status = "";
  users: User[] = [];
  titleObservable = this.httpService.getTitle();

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    firebase
    console.log("fb: " + firebase);
    console.log("fb: " + firebase.app);
    
    this.httpService.getTitle().subscribe(
      (data: any) => this.title = data
    )
  }

  loadDataList() {
    this.httpService.getData().subscribe(
      (data: any) => {
        this.status = "Loaded";
        console.log(data);
        this.users = [];
        for (let key in data) {
          this.users.push(data[key]);
        }
        console.log(this.users);
      }
    );
  }

  saveData() {
    console.log("save data");
    this.httpService.saveData(this.user).subscribe(
      response => {
        this.status = response.ok ? "OK" : response.statusText
      }
    );
  }

}
