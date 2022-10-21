import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { User } from '../interfaces/user';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sharedData: string = '';

  apiUrl = environment.apiUrl + 'auth/';

  private issuer = {
    login: this.apiUrl + 'login',
    register: this.apiUrl + 'register',
  };


  constructor(private http: HttpClient) { }

  postRegister(user: User): Observable<any>{
    return this.http.post(this.issuer.register, user)
  }

  postLogin(user: User): Observable<any>{
    return this.http.post(this.issuer.login, user);
  }

  postLogout(){
    return this.http.get(this.apiUrl + 'logout');
  }

  getUser(): Observable<any>{
    return this.http.get(this.apiUrl + 'getUser');
  }

  requestPassword(user: User): Observable<any>{
    return this.http.post(this.apiUrl + 'password/forgot', user);
  }

  saveToken(token:any){
    return localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isValidToken(){
    const token = this.getToken()
    if (token){
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    }else{
      return false;
    }
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('token');
  }
}
