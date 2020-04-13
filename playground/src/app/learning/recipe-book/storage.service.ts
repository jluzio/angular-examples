import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable()
export class StorageService {
  private dbUrl = environment.apiKeys["recipe-book"];
  private resourceKey = "{resource}";
  private resourcePattern = `${this.dbUrl}/angular-examples/recipe-book/${this.resourceKey}.json`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getResource<T>(resource: string) {
    return <Observable<T>> this.http.get(this.resourceUrl(resource));
  }

  public postResource(resource: string, data: any) {
    return this.http.post(this.resourceUrl(resource), JSON.stringify(data), this.httpOptions);
  }

  public putResource(resource: string, data: any) {
    return this.http.put(this.resourceUrl(resource), JSON.stringify(data), this.httpOptions);
  }
  
  public deleteResource(resource: string) {
    return this.http.delete(this.resourceUrl(resource));
  }

  public getResourceAsPromise(resource: string) {
    return this.http.get(this.resourceUrl(resource))
      .toPromise();
  }

  private resourceUrl(resource: string) {
    return this.resourcePattern.replace(this.resourceKey, resource);
  }
  
  /*
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
      const body = error.body || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return errMsg;
  }
  */

}
