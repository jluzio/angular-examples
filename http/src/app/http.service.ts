import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
  dbUrl = "https://angular2-course-70b11.firebaseio.com";
  resourceKey = "{resource}";
  resourcePattern = `${this.dbUrl}/${this.resourceKey}.json`;

  constructor(private http: Http) { }

  defaultCfg(observable: Observable<Response>) {
    return observable
      .map(response => response.json())
      .catch(this.handleError);
  }

  getTitle() {
    return this.defaultCfg( this.http.get(this.resourceUrl("title")) );
  }

  getData() {
    return this.defaultCfg( this.http.get(this.resourceUrl("data")) );
  }

  saveData(data: any) {
    return this.defaultCfg( this.http.post(this.resourceUrl("data"), data) );
  }

  saveDataJson(data: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    
    return this.defaultCfg( this.http.post(this.resourceUrl("data"), body, {headers: headers}) );
  }

  resourceUrl(resource: string) {
    return this.resourcePattern.replace(this.resourceKey, resource);
  }

  private handleError(error: any): Promise<any> {
    //console.log("handle error");
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
