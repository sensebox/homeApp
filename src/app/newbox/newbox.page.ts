import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {PrivacyDisclaimerPage} from '../privacy-disclaimer/privacy-disclaimer.page'
@Component({
  selector: 'app-newbox',
  templateUrl: './newbox.page.html',
  styleUrls: ['./newbox.page.scss'],
})
export class NewboxPage implements OnInit {
  public sensors = [
    {name:"HDC1080",isChecked:false},
    {name:"BMP280",isChecked:false},
    {name:"TSL450",isChecked:false},
    {name:"BME680",isChecked:false},
    {name:"SDS011",isChecked:false},
    {name:"Soil",isChecked:false},
    {name:"Sound volume",isChecked:false},
  ]
  constructor(private modalController: ModalController) { }


  async presentModal(){
    const modal = await this.modalController.create({
      component:PrivacyDisclaimerPage
    })
    
    return await modal.present();
  }

  ngOnInit() {
    // this.presentModal();
  }

}
