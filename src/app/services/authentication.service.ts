import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { timeout } from 'rxjs/operators'
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private URL_login = 'https://api.opensensemap.org/users/sign-in'
  private URL_register = 'https://api.opensensemap.org/users/register'
  private URL_newbox = 'https://api.opensensemap.org/boxes'
  


  constructor(
    private http: HttpClient,
    private platform: Platform,
    private storage: Storage  
  ) 
  { 
    this.platform.ready().then(()=>{
      console.log("ready");
      // check to see if there are values stored in the internal storage 
      storage.get('useremail').then((email)=>{
        if(email){
          storage.get('userpw').then((pw)=>{
            this.submitLogin(email,pw);
          })
        }
      })
    })
  }

  submitLogin(username:string,password:string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'} );
    return this.http.post(`${this.URL_login}?email=${username}&password=${password}`,{headers})
            .pipe(timeout(30000))
  }


  addBox(box,token:string){
    /**
     * name , exposure location
     */
    const headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+token});
    return this.http.post(`${this.URL_newbox}`,box,{headers})
                .pipe(timeout(30000))

  }

  registerUser(name:string,email:string,password:string){
    const headers = new HttpHeaders({})

    return this.http.post(`${this.URL_register}?name=${name}&email=${email}&password=${password}`,{headers})
              .pipe(timeout(30000))       
  }

  

}
