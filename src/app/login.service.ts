import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators'
import {LoginPageModule} from './login/login.module'
const URL_login = 'https://api.opensensemap.org/users/sign-in';
const URL_user = 'https://api.opensensemap.org/users/me/boxes';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }

  submitLogin(username:string,password:string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'} );
    return this.http.post(`${URL_login}?email=`+username+`&password=`+password,{headers})
            .pipe(timeout(30000))
  }

  getUserBoxes(token){
    const headers = new HttpHeaders({'Authorization':"Bearer "+token})
    return this.http.get(URL_user,{headers})
              .pipe(timeout(30000))
  }
}