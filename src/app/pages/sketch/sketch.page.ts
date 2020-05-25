import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { WebcompilerService } from 'src/app/services/webcompiler/webcompiler.service';
import { IonSlides } from '@ionic/angular'
@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.page.html',
  styleUrls: ['./sketch.page.scss'],
})
export class SketchPage implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  loginInformation: any;
  box: Box;
  ssid: string;
  passwordWifi: string
  compiledSketch: any
  private sketch: string
  private selected: string
  private image = "assets/senseboxmcu.png"

  constructor(private router: Router, private route: ActivatedRoute, private LoginService: LoginService,
    private compiler: WebcompilerService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loginInformation = this.router.getCurrentNavigation().extras.state.loginInformation;
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
    this.LoginService.getUserSketch(this.loginInformation.token, this.box._id, this.ssid, this.passwordWifi)
      .subscribe(sketch => {
        let navigationExtras: NavigationExtras = {
          state: {
            sketch
          }
        }
        this.router.navigate(['ota-wizard'], navigationExtras)
      })
  }

  onSlideChange() {
    let current: Promise<Number> = this.slides.getActiveIndex();
    current.then((number) => {
      switch (number) {
        case OtaSlides.Intro:
          console.log("Intro")
          break;
        case OtaSlides.WiFi:
          console.log("Wifi")
          break;
        case OtaSlides.ModeGuide:
          this.handleCompilation();
          break;
        case OtaSlides.Mode:
          break;
        case OtaSlides.Final:
          break;

        default:
          console.warn("Unknown slide");
      }
    })
  }

  handleCompilation() {
    // get user sketch
    this.LoginService.getUserSketch(this.loginInformation.token, this.box._id, this.ssid, this.passwordWifi)
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
  Final = 4
}