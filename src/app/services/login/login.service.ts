import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators'
const URL_login = 'https://api.opensensemap.org/users/sign-in';
const URL_user = 'https://api.opensensemap.org/users/me/boxes';
const URL_register = 'https://api.opensensemap.org/users/register';
const URL_sketch = 'https://api.opensensemap.org/boxes/';
const URL_newbox = 'https://api.opensensemap.org/boxes'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }

  submitLogin(username:string,password:string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'} );
    return this.http.post(`${URL_login}?email=${username}&password=${password}`,{headers})
            .pipe(timeout(30000))
  }

  getUserBoxes(token:string){
    const headers = new HttpHeaders({'Authorization':"Bearer "+token})
    return this.http.get(URL_user,{headers})
              .pipe(timeout(30000))
  }

  registerUser(name:string,email:string,password:string){
    const headers = new HttpHeaders({})

    return this.http.post(`${URL_register}?name=${name}&email=${email}&password=${password}`,{headers})
              .pipe(timeout(30000))       
  }

  registerBox(box,token:string){
    /**
     * name , exposure location
     */
    const headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this.http.post(`${URL_newbox}`,box,{headers})
                .pipe(timeout(30000))

  }
  getUserSketch(token:string,id:string,ssid:string,password:string){
    const headers = new HttpHeaders({'Authorization':"Bearer "+token})
    return this.http.get(`${URL_sketch}${id}/script?ssid=${ssid}&password=${password}`,{headers,responseType:'text'})
            .pipe(timeout(30000))
  }

  getUserLocation(){
    
  }
}