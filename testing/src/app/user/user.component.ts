import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { DataService } from './../shared/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  data: string;
  user = {};

  constructor(private userService: UserService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDetails().then(
      data => this.data = data
    );
  }

}
