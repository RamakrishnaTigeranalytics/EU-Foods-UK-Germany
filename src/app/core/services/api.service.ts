import { Injectable } from '@angular/core';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
// import {HttpClient} from '@angular/common/http';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_path = environment.api_url
  token = environment.token

  constructor(private http: HttpClient) {
    // console.log('SERVICE CONSTRUCTOR');

   }
  private formatErrors(error: any) {
    return  throwError(error.error);
  }
   get<T>(path: string , param?): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
   });
   let params = new HttpParams();
   if(param){
    
    params = params.append('actors', JSON.stringify(param));

   }
  //  debugger
   
    return this.http.get<T>(`${this.api_path}${path}`,{ headers: reqHeader, params : params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
   });
    return this.http.put(
      `${this.api_path}${path}`,
      JSON.stringify(body),
      { headers: reqHeader},
    ).pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: Object = {}): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
   });
   let obj={}
   
    return this.http.post<T>(
      `${this.api_path}${path}`,
      JSON.stringify(body),
      { headers: reqHeader},
  
    ).pipe(catchError(this.formatErrors));
  }

  postd(path: string, body: Object = {}): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
   });
   
   
    return this.http.post(
      `${this.api_path}${path}`,
      JSON.stringify(body),
      { headers: reqHeader,
      responseType:'blob',
       
    },
  
    ).pipe(catchError(this.formatErrors));
  }

  delete(path:string): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
   });
   
    return this.http.delete(
      `${this.api_path}${path}`,
      { headers: reqHeader},
    ).pipe(catchError(this.formatErrors));
  }
}
