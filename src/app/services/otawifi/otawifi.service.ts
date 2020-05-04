import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OtawifiService {

  constructor(private http:HttpClient) {


   }

  public scanNetwork(){
    console.log("scanning Network from service");
    const response = {code:"Ok",message:"message from wifi"};
    // get host ip; scan host ip from 0 to 255 until something is found 

    // : get host ip (https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only)
  }

}

