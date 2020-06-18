import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PrivacyDisclaimerPage } from '../../components/privacy-disclaimer/privacy-disclaimer.page'
import { OverviewnewboxPage } from '../../components/overviewnewbox/overviewnewbox.page'
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-newbox',
  templateUrl: './newbox.page.html',
  styleUrls: ['./newbox.page.scss'],
})
export class NewboxPage implements OnInit {
  public sensors2 = [
    { name: "HDC1080", isChecked: false },
    { name: "BMP280", isChecked: false },
    { name: "TSL450", isChecked: false },
    { name: "BME680", isChecked: false },
    { name: "SDS011", isChecked: false },
    { name: "Soil", isChecked: false },
    { name: "SoundVolume", isChecked: false },
  ]
  public sensors: Array<newSensor> = [
    { title: "HDC1080", unit: "°C", sensorType: "Temperature", isChecked: false },
    { title: "BMP280", unit: "Pa", sensorType: "Air pressure", isChecked: false },
    { title: "TSL450", unit: "Lux", sensorType: "Light", isChecked: false },
    { title: "BME680", unit: "Q", sensorType: "Air quality", isChecked: false },
    { title: "SDS011", unit: "PM10", sensorType: "Fine dust", isChecked: false },
    { title: "SoundVolume", unit: "°C", sensorType: "Sound", isChecked: false },
    { title: "Soil", unit: "kA", sensorType: "kA", isChecked: false },
  ]
  private latitude;
  private longitude;
  private location: Object;
  private token;
  private refreshToken;
  private selected: string;

  private box: newBox;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private geolocation: Geolocation,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.token = this.router.getCurrentNavigation().extras.state.token
        console.log(this.token)
        this.refreshToken = this.router.getCurrentNavigation().extras.state.refreshToken
      }
    })
  }

  toggleOutdoor() {
    this.selected = 'outdoor'
  }

  toggleIndoor() {
    this.selected = 'indoor'

  }

  toggleMobile() {
    this.selected = 'mobile'

  }
  async presentModalPrivacy() {
    const modal = await this.modalController.create({
      component: PrivacyDisclaimerPage
    })

    return await modal.present();
  }

  async presentModalOverview(newbox) {
    const modal = await this.modalController.create({
      component: OverviewnewboxPage,
      componentProps: [newbox, this.token, this.refreshToken]
    })

    return await modal.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    toast.present();
  }


  async handleUserLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.presentToast("Succesfully got location")
      //  { "lat": 51.972, "lng": 7.684, "height": 66.6 } 
      // this.location = {"lat":resp.coords.latitude,"lng":resp.coords.longitude,"height":66.6}
      this.location = { "lat": 51.9606649, "lng": 7.6261347, "height": 66.6 }
      this.latitude = 51.9606649//resp.coords.latitude; // 
      this.longitude = 7.6261347 //resp.coords.longitude // 
    })
      .catch((error) => {
        this.presentToast("Error getting location");
        console.log("Error getting location", error);
      })
  }

  isSensor(key) {
    const sensors = ["HDC1080", "BMP280", "TSL450", "BME680", "SDS011", "SoundVolume", "Soil"];
    if (sensors.includes(key)) {
      return true;
    }
    else {
      return false;
    }
  }

  handleNewBox(form) {
    console.log(form);
    if (form.form.status === 'INVALID') {
      this.presentToast('Form invalid, have you filled out every field ? ')
      return;
    }
    let sensoren: Sensor[]=[];
    Object.keys(form.form.value).map((key, index) => {
      if (this.isSensor(key)) {
        if (form.form.value[key]) {
          switch (key) {
            case "HDC1080":
              sensoren.push({
                title: "Temperatur",
                unit: "°C",
                sensorType: key
              },
                {
                  title: "rel. Luftfeuchte",
                  unit: "%",
                  sensorType: key
                }
              )
              break;
            case "BMP280":
              sensoren.push({
                title: "Luftdruck",
                unit: "hPa",
                sensorType: key
              })
              break;
            case "TSL450":
              sensoren.push({
                title: "Beleuchtung",
                unit: "Lux",
                sensorType: key
              })
              break;
            case "BME680":
              sensoren.push({
                title: "Luftqualität",
                unit: "%",
                sensorType: key
              })
              break;
            case "SDS011":
              sensoren.push({
                title: "PM10",
                unit: "µg/m³",
                sensorType: key
              },{
                title:"PM25",
                unit: "µg/m³",
                sensorType:key
              })
              break;
            case "SoundVolume":
              sensoren.push({
                title: "Lautsärke",
                unit: "db",
                sensorType: key
              })
              break;
            case "Soil":
              sensoren.push({
                title: "Bodenfeuchte",
                unit: "%",
                sensorType: key
              })
              break;
            default:
              break;
          }
        }
      }
    })
    const newbox = {
      name: form.form.value.name,
      exposure: this.selected,
      location: { lat: parseFloat(form.form.value.latitude), lng: parseFloat(form.form.value.longitude) },
      sensors: sensoren
    }
    this.presentModalOverview(newbox)


  }

  ngOnInit() {
    // this.presentModal();
  }

}
