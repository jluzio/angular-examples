import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  getDetails() {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve("async data");
      }, 1500);
    });
  }

}
