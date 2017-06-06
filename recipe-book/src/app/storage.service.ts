import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class StorageService {
  private dbUrl = "https://recipebook-cdbbf.firebaseio.com";
  private resourceKey = "{resource}";
  private resourcePattern = `${this.dbUrl}/${this.resourceKey}.json`;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  public getResource(resource: string) {
    return this.http.get(this.resourceUrl(resource))
      .map(response => response.json())
      .catch(this.handleErrorAsObservable);
  }

  public postResource(resource: string, data: any) {
    return this.http.post(this.resourceUrl(resource), JSON.stringify(data), {headers: this.headers})
      .map(response => response.json())
      .catch(this.handleErrorAsObservable);
  }

  public putResource(resource: string, data: any) {
    return this.http.put(this.resourceUrl(resource), JSON.stringify(data), {headers: this.headers})
      .map(response => response.json())
      .catch(this.handleErrorAsObservable);
  }
  
  public deleteResource(resource: string) {
    return this.http.delete(this.resourceUrl(resource))
      .map(response => response.json())
      .catch(this.handleErrorAsObservable);
  }

  public getResourceAsPromise(resource: string) {
    return this.http.get(this.resourceUrl(resource))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleErrorAsPromise);
  }

  private resourceUrl(resource: string) {
    return this.resourcePattern.replace(this.resourceKey, resource);
  }

  private extractData(response: Response) {
    return response.json();
  }
  
  private handleErrorAsPromise(error: any): Promise<any> {
    let errMsg = this.getErrorMessage(error);
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  private handleErrorAsObservable(error: Response | any) {
    let errMsg = this.getErrorMessage(error);
    console.error(errMsg);
    return Observable.throw(errMsg);
  }  

  private getErrorMessage(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return errMsg;
  }

}
