import { Component, OnInit } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import {PrivacyDisclaimerPage} from '../../components/privacy-disclaimer/privacy-disclaimer.page'
import {OverviewnewboxPage} from '../../components/overviewnewbox/overviewnewbox.page'
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { ActivatedRoute, Router } from '@angular/router';
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
    {name:"SoundVolume",isChecked:false},
  ]
  private latitude;
  private longitude;
  private token;
  private refreshToken;

  constructor(
    private modalController: ModalController,
    private toastController:ToastController, 
    private geolocation: Geolocation,
    private route:ActivatedRoute,
    private router:Router)
    {
      this.route.queryParams.subscribe(params=>{
        if(this.router.getCurrentNavigation().extras.state){
          this.token = this.router.getCurrentNavigation().extras.state.token
          this.refreshToken = this.router.getCurrentNavigation().extras.state.refreshToken
        }
      })
    }


  async presentModalPrivacy(){
    const modal = await this.modalController.create({
      component:PrivacyDisclaimerPage
    })
    
    return await modal.present();
  }

  async presentModalOverview(form,sensors){
    const modal = await this.modalController.create({
      component:OverviewnewboxPage,
      componentProps:[form,sensors,this.token,this.refreshToken]
    })
    
    return await modal.present();
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  

  async handleUserLocation(){
    this.geolocation.getCurrentPosition().then((resp)=>{
      this.presentToast("Succesfully got location")
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude
    })
    .catch((error)=>{
      this.presentToast("Error getting location");
      console.log("Error getting location",error);
    })
  }

  handleNewBox(form){
    let filtered = this.sensors.filter((sensor)=>{
      return sensor.isChecked === true
    })
    this.presentModalOverview(form.value,filtered);
  }

  ngOnInit() {
    // this.presentModal();
  }

}
