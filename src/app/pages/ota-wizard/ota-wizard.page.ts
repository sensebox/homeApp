import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OtawifiService } from '../../services/otawifi/otawifi.service'
import { WebcompilerService } from '../../services/webcompiler/webcompiler.service'

@Component({
  selector: 'app-ota-wizard',
  templateUrl: './ota-wizard.page.html',
  styleUrls: ['./ota-wizard.page.scss'],
})
export class OtaWizardPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides
  availableSenseboxes: string[] = [] // list of SSIDs
  errorMsg = ''
  state: OtaState = {
    isOnline: false,
    compilation: 'compiling',
    wifiSelection: 'scanning',
    upload: 'uploading',
  }

  // for unified slide index access in the template
  slideCompilation = OtaSlides.Compilation
  slideScan = OtaSlides.Scan
  slideUpload = OtaSlides.Upload

  private sketch = ''
  private compiledSketch: ArrayBuffer = undefined
  private hiddenSlides: OtaSlides[] = []
  private slideHistory: string[] = [OtaSlides[OtaSlides.Intro]] // for debug info in logs
  private counts = { compile: 0, connect: 0, upload: 0 }
  private modus;
  private OTAAddress = '192.168.0.46';

  constructor(private route: ActivatedRoute, private router: Router, private otawifi: OtawifiService, private webcompiler: WebcompilerService) {
    // build new sketch from api response 

    // for OTA to work, the new sketch has to include the OTA logic as well.
    // to ensure that, we're prepending it here to the sketch.
    // this also works regardless wether the sketch already contains this line.
    this.sketch = '#include <SenseBoxOTA.h>\n'
    let sketch = ''
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        sketch = this.router.getCurrentNavigation().extras.state.sketch;
        this.sketch += sketch
      }
    })
  }

  ngOnInit() {

  }

  async onSlideChange() {
    let currentSlide = await Promise.resolve(this.slides.getActiveIndex());
    //  this.slideHistory.push(OtaSlides[currentSlide])
    console.log("currentslide", currentSlide)
    switch (currentSlide) {
      case OtaSlides.Intro:
        this.handleIntro();
        break
      case OtaSlides.Scan:
        this.handleScanInit()
        //if(this.modus == undefined) this.slides.lockSwipeToNext(true);
        break
      case OtaSlides.Compilation:
        break
      case OtaSlides.Upload:
        this.handleUpload()
        break

      default:
        console.log("unkown slide")
      //this.log.warn('unknown slide, please define its logic', { slide: this.currentSlide })
    }
  }
  handleScanInit() {
    console.log("handleScanInit")
  }

  private async  handleUpload() {
    this.state.upload = 'uploading';
    try {

      const res = await this.otawifi.uploadFirmware(this.compiledSketch, this.OTAAddress)
      //this.log.debug(JSON.stringify(res, null, 2))

      this.state.upload = 'done'
      this.slides.lockSwipeToNext(false)
    } catch (err) {
      this.state.upload = 'error'
      this.errorMsg = err.message
     // this.log.error('could not upload sketch:', err.message)
    }

  }
  handleWifiSelection() {
    console.log("handleWifiSelection");
  }

  handleIntro() {
    console.log(this.sketch);
  }

  private async handleCompiling() {
    this.slides.slideNext();
    this.slides.lockSwipeToNext(!this.compiledSketch)
    this.compileSketch();
    const compiledSketch = await this.webcompiler.compile(this.sketch);
    this.slides.slideNext();
  }

  handleScan() {
    // change this.OTAAddress
    console.log("handleScan()");
    this.otawifi.scanNetwork()
    this.slides.slideNext();
  }

  private showSlide(slide: OtaSlides) {
    this.hiddenSlides = this.hiddenSlides.filter((hiddenSlide) => hiddenSlide != slide)
  }




  private async compileSketch() {

    this.state.compilation = 'compiling'
    try {
      this.compiledSketch = await this.webcompiler.compile(this.sketch)
      this.state.compilation = 'done'
      this.slides.lockSwipeToNext(false)
    } catch (err) {
      this.state.compilation = 'error'
      this.errorMsg = !err.message ? err : err.message
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br/>')
      // this.log.error('could not compile sketch:', err.message)
    }

  }
}



type OtaState = {
  isOnline: boolean,
  compilation: 'compiling' | 'go-online' | 'done' | 'error',
  wifiSelection: 'scanning' | 'connecting' | 'select' | 'manual' | 'error',
  upload: 'uploading' | 'done' | 'error',
}
type scanResult = {
  IP: string,
  message: string
}
// names for the slide indices for easier access
enum OtaSlides {
  Intro = 0,
  // Intro2 = 1,
  Compilation = 1,
  Scan = 2,
  Upload = 3
}
