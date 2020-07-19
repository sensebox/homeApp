import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { WebcompilerService } from 'src/app/services/webcompiler/webcompiler.service';
import { OtawifiService } from 'src/app/services/otawifi/otawifi.service'
import { IonSlides, LoadingController } from '@ionic/angular'
import { OsemService } from 'src/app/services/osem.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.page.html',
  styleUrls: ['./sketch.page.scss'],
})
export class SketchPage implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  box: Box;
  ssid: string;
  passwordWifi: string
  compiledSketch: any
  private sketch: string
  public selected: string
  private image = "assets/senseboxmcu.png"
  public OTAAddress = '192.168.0.46'


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compiler: WebcompilerService,
    private otawifi: OtawifiService,
    private osem: OsemService,
    public loadingController: LoadingController,
    private storage: Storage,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.box = this.router.getCurrentNavigation().extras.state.box;
      }
    })
  }
  viewSensor(sensor) {
    let navigationExtras: NavigationExtras = {
      state: {
        sensor
      }
    }
    this.router.navigate(['sensor'], navigationExtras)
  }
  uploadStandardSketch() {
    this.storage.get('token').then((token) => {
      this.osem.getUserSketch(token, this.box._id, this.ssid, this.passwordWifi)
        .subscribe(sketch => {
          let navigationExtras: NavigationExtras = {
            state: {
              sketch
            }
          }
          this.router.navigate(['ota-wizard'])
        })
    })

  }

  onSlideChange() {
    let current: Promise<Number> = this.slides.getActiveIndex();
    let hiddenOffset: any = this.compiledSketch ? 1 : 0;
    current.then((number) => {
      number > 4 ? number + hiddenOffset : number;
      switch (number) {
        case OtaSlides.Intro:
          console.log("Intro")
          break;
        case OtaSlides.WiFi:
          console.log("Wifi")
          break;
        case OtaSlides.ModeGuide:
          console.log("ModeGuide")
          this.handleCompilation();
          break;
        case OtaSlides.Mode:
          console.log("Mode")
          break;
        case OtaSlides.Compiling:
          console.log("Compiling");
        case OtaSlides.Final:
          console.log("Final")
          this.handleUpload();
          break;

        default:
          console.warn("Unknown slide");
      }
    })
  }

  handleCompilation() {
    // get user sketch
    this.storage.get('token').then((token) => {
      this.osem.getUserSketch(token, this.box._id, this.ssid, this.passwordWifi)
        .subscribe((sketch) => {
          // get id for compiler
          this.compiler.compileId(sketch)
            .subscribe((response: any) => {
              // use id to download compiled sketch
              this.compiler.getBinary(response.data.id)
                .subscribe((binary) => {
                  // save compiled sketch 
                  this.compiledSketch = binary
                })
            })
        })
    })
  }

  async handleFinalSlide() {
    // Show modal / loading when sketch isnt compiled yet otherwise just go ahead

    if (!this.compiledSketch) {
      // show modal
      const loading = await this.loadingController.create({
        message: 'Please wait for the compiler to finish...',
      })
      await loading.present()

    }
    else {
      this.slides.slideNext()
    }

  }

  handleUpload() {
    // this.otawifi.uploadFirmware(this.compiledSketch,this.OTAAddress)
    //             .subscribe((response)=>{
    //               console.log(response)
    //             })
  }


  toggleManual() {
    this.selected = 'manual'
  }

  toggleAutomatic() {
    this.selected = 'automatic'
  }

  ngOnInit() {
  }

}
enum OtaSlides {
  Intro = 0,
  WiFi = 1,
  ModeGuide = 2,
  Mode = 3,
  Compiling = 4,
  Final = 5
}