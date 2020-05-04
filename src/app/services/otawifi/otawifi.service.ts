import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Platform } from 'ionic-angular'
import { timeout, catchError } from 'rxjs/operators'

// use global var as no @ionic-native/wifiwizard2 package is available yet
declare var WifiWizard2: any

// corresponding to the initial MCU firmware
const SSID_PREFIX = 'sensebox'
const SENSEBOX_API = 'http://192.168.1.1'
const URL_sensebox = 'http://192.168.0.46'


@Injectable({
  providedIn: 'root'
})

export class OtawifiService {

  constructor(private http: HttpClient) {


  }

  async uploadFirmware(binary: ArrayBuffer, OTAAddress: String): Promise<any> {
    // TODO: send checksum?
    return this.http.post(`http://${OTAAddress}/sketch`, binary, {
      responseType: 'text',
    })
      .pipe(timeout(5000), catchError(err => {
        throw new Error('senseBox not found. Is it running in OTA mode?')
      }))
      .toPromise()
  }

  public scanNetwork() {
    console.log("scanning Network from service");
    const response = { code: "Ok", message: "message from wifi" };
    // get host ip; scan host ip from 0 to 255 until something is found 

    // : get host ip (https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only)
  }



}

