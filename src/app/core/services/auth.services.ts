import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import {
  HttpClient,
  
} from '@angular/common/http';
import {User} from "@core/models"
// import {} from "@angular/htt"
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _user = {"token":"6d04fcea0bfa842be3049fae404e84c35e701ec0","user":{"email":"admin@effem.com","name":"admin","id":1,"groups":[{"name":"admin"},{"name":"pricing"},{"name":"promo"},{"name":"optimizer"}]}}
  isLoggedInObservable = new BehaviorSubject<boolean>(false);
  userObservable = new BehaviorSubject<User>(null as any);
  // userObservable = new BehaviorSubject<User>(this._user);
  showarrow = false

  constructor(private http: HttpClient, private router: Router) {
    let token = localStorage.getItem('token');
    let user  = localStorage.getItem('user')

    // let token = '6d04fcea0bfa842be3049fae404e84c35e701ec0'
    // let user  = this._user
    if (token) {
      this.isLoggedInObservable.next(true);
      this.userObservable.next(JSON.parse(user!) as User)
      // this.userObservable.next(user as User)
    }
  }
  getUser():Observable<User>{

    return this.userObservable.asObservable()
  }
  setShowArrow(value:boolean){
    this.showarrow = value
  }
  getShowArrow():boolean{
    return this.showarrow
  }
  setUser(user:User){
    this.userObservable.next(user)
  }
  login(credentials) {
    console.log(credentials, 'CREDENTIALS');
    let formData: FormData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    return this.http.post( environment.api_url+ 'api/user/token/', formData, {
       
    });
  }
  logout() {
    let user = this.userObservable.getValue()
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + user.token
   });
    return this.http.get( environment.api_url+ 'api/user/logout/',{ headers: reqHeader })
    // localStorage.removeItem('token');
    // localStorage.removeItem('user')
    // this.isLoggedInObservable.next(false);
    // this.router.navigate(['/']);
  }
  isLogged(): boolean {
    return this.isLoggedInObservable.getValue();
  }
  isLoggedIn(): Observable<boolean> {
    // let token = localStorage.getItem('token')
    return this.isLoggedInObservable.asObservable();
  }
}
