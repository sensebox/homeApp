import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class NetworkscannerService {


  public strategy: WifiStrategy

  constructor(
    private network: Network,
    private wifiWizard: WifiWizard2,
    private platform: Platform,
    private toastController:ToastController
  ) {
    this.strategy = this.selectStrategy()
   }

   async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  private selectStrategy(): WifiStrategy {
    try {
      WifiWizard2
    }
    catch (err) {
      return WifiStrategy.Manual;
    }

    if(this.platform.is('android'))
      return WifiStrategy.Automatic
    
    return WifiStrategy.Manual
  }

  async scanNetwork(): Promise<string[]> {
    if (this.strategy != WifiStrategy.Automatic) {
      console.log("Cannot search for network using defaults..");
      this.presentToast("Cannot search for network using defaults..")
      return ["heimatplanet", "Meins", "404 not found"]
    }

    try {
      let networks = await this.wifiWizard.scan();

      return networks;
    }
    catch (err) {
      if (err === 'SCAN_FAILED')
      {
        this.presentToast('WiFi scan failed. Maybe location services are disabled or the location permission isn\'t set for this app?');
        throw new Error('WiFi scan failed. Maybe location services are disabled or the location permission isn\'t set for this app?');
      }
        else{
          this.presentToast(err);
          throw new Error(err);
        }
    }


  }
}

export enum WifiStrategy {
  Automatic = 'Automatic',   // android
  Manual = 'Manual',      // iOS, browser
  Unavailable = 'Unavailable', // currently unused
}
