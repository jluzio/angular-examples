import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';

@Injectable()
export class RestService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getResource<T>(resourceUrl: string) {
    return <Observable<T>> this.http.get(resourceUrl);
  }

  public postResource(resourceUrl: string, data: any) {
    return this.http.post(resourceUrl, JSON.stringify(data), this.httpOptions);
  }

  public putResource(resourceUrl: string, data: any) {
    return this.http.put(resourceUrl, JSON.stringify(data), this.httpOptions);
  }
  
  public deleteResource(resourceUrl: string) {
    return this.http.delete(resourceUrl);
  }

  public getResourceAsPromise(resourceUrl: string) {
    return this.http.get(resourceUrl)
      .toPromise();
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
