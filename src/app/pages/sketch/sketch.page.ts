import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { WebcompilerService } from 'src/app/services/webcompiler/webcompiler.service';
import { OtawifiService } from 'src/app/services/otawifi/otawifi.service'
import { IonSlides, LoadingController, ToastController } from '@ionic/angular'
import { NetworkscannerService, WifiStrategy } from 'src/app/services/networkscanner.service';
import { OsemService } from 'src/app/services/osem.service';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.page.html',
  styleUrls: ['./sketch.page.scss'],
})
export class SketchPage implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  ssid: string;
  passwordWifi: string;
  wifiSecurity: string;
  ipSettings: string;
  box: Box
  networks: string[] = [] // ssid's in the area
  public selected: string
  private success: Boolean = false;
  errorMsg = ''
  state: OtaState = {
    isOnline: false,
    wifiSelection: 'scanning',
    upload: 'uploading',
  }


  constructor(
    private networkScanner: NetworkscannerService,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private changedetect: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private osem: OsemService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.box = this.router.getCurrentNavigation().extras.state.box;
        console.log(this.box);
      }
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onSlideChange() {
    let current: Promise<Number> = this.slides.getActiveIndex();
    current.then((number) => {
      switch (number) {
        case OtaSlides.intro:
          // scan for networks here
          //this.networkScanner.scanNetwork();
          console.log("Wifi")
          this.slides.lockSwipeToNext(false);
          break;
        case OtaSlides.disclaimer:
          // show config form
          console.log("config")
          this.slides.lockSwipeToNext(false);
          break;
        case OtaSlides.wifi:
          // display success/error message
          console.log("result")
          this.slides.lockSwipeToNext(true);
          break;
        case OtaSlides.result:
          // display success/error message
          console.log("result")
          break;
        default:
          console.warn("Unknown slide");
      }
    })
  }


  onWifiRefresh() {
    this.handleWifiSelection(true)
  }

  ngOnInit() {

    // this.networkScanner.scanNetwork()
    //   .then(ssids => {
    //     console.log(ssids);
    //     this.networks = ssids
    //   });



    // this.state.wifiSelection = 'manual';

  }

  private saveNetwork(ssid: string) {
    this.ssid = ssid;
  }

  private async handleWifiSelection(force = false) {
    if (this.networkScanner.strategy === WifiStrategy.Automatic) {
      this.slides.lockSwipeToNext(true)

      // skip scan when boxes where already found from the scan on startup
      if (!force && this.networks.length)
        return this.state.wifiSelection = 'select'

      try {
        this.state.wifiSelection = 'scanning'
        // force update of view, as setting subproperties of this.state is not detected automatically :/
        this.changedetect.detectChanges()
        this.networks = await this.networkScanner.scanNetwork()
        this.state.wifiSelection = 'select'
        this.changedetect.detectChanges()
      } catch (err) {
        this.errorMsg = err.message
        this.state.wifiSelection = 'error'
        this.changedetect.detectChanges()
      }
    }
  }

  private uploadToSenseBox() {
    console.log("uploading to 192.168.2.1")
    let sensors = {
      temperature: 'None',
      humidty: 'None',
      light: 'None',
      uv: 'None',
      pressure: 'None',
      rain: 'None',
      pm10: 'None',
      pm25: 'None',
    }
    this.box.sensors.map((sensor) => {
      switch (sensor.title) {
        case 'Temperatur':
          sensors['temperature'] = sensor._id
          break;
        case 'rel. Luftfeuchte':
          sensors['humidity'] = sensor._id
          break;
        case 'Beleuchtungsstärke':
          sensors['light'] = sensor._id
          break;
        case 'UV-Intensität':
          sensors['uv'] = sensor._id
          break;
        case 'Luftdruck':
          sensors['pressure'] = sensor._id
          break;
        case 'Regenmesser':
          sensors['rain'] = sensor._id
          break;
        case 'PM10':
          sensors['pm10'] = sensor._id
          break;
        case 'PM2.5':
          sensors['pm25'] = sensor._id
          break;
        default:
          break;
      }
    })

    this.osem.uploadToSenseBox(this.wifiSecurity, this.ssid, this.passwordWifi, this.box._id, sensors, this.ipSettings)
      .subscribe((response) => {
        console.log(response)
        this.success = true;
        this.slides.lockSwipeToNext(false);
        this.slides.slideNext();

      },
        (error) => {
          this.success = false;
          console.error(error);
          this.slides.lockSwipeToNext(false);
          this.slides.slideNext();
        })


    // const url = ''
    // this.osem.uploadToSenseBox(url)
    //     .subscribe((response)=>{
    //       console.log(response)
    //     },
    //     (error)=>{
    //       console.error(error);
    //     })
  }

  forwardBox(box) {
    let navigationExtras: NavigationExtras = {
      state: {
        box
      }
    }
    this.router.navigate(['box'], navigationExtras)
  }

}
enum OtaSlides {
  intro = 0,
  disclaimer = 1,
  wifi = 2,
  result = 3
}

type OtaState = {
  isOnline: boolean,
  wifiSelection: 'scanning' | 'connecting' | 'select' | 'manual' | 'error',
  upload: 'uploading' | 'done' | 'error',
}