import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

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
  slideWifi = OtaSlides.WifiSelection
  slideUpload = OtaSlides.Upload

  private onlineSub: Subscription
  private offlineSub: Subscription
  private sketch = ''
  private compiledSketch: ArrayBuffer = undefined
  private hiddenSlides: OtaSlides[] = []
  private slideHistory: string[] = [OtaSlides[OtaSlides.Intro]] // for debug info in logs
  private counts = { compile: 0, connect: 0, upload: 0 }
  private modus;
  private OTAAddress;

  constructor(private route:ActivatedRoute,private router:Router,) {
    // build new sketch from api response 

    // for OTA to work, the new sketch has to include the OTA logic as well.
    // to ensure that, we're prepending it here to the sketch.
    // this also works regardless wether the sketch already contains this line.
    this.sketch = '#include <SenseBoxOTA.h>\n'
    let sketch = ''
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        sketch = this.router.getCurrentNavigation().extras.state.sketch;      
        this.sketch+=sketch
      }
    })
   }

  ngOnInit() {

  }

  onSlideChange() {
    this.slideHistory.push(OtaSlides[this.currentSlide])
    switch (this.currentSlide) {
      case OtaSlides.Intro:
        break
      case OtaSlides.ModeGuide:
        //if(this.modus == undefined) this.slides.lockSwipeToNext(true);
        break
      case OtaSlides.Compilation:
        this.handleCompilation()
        break
      case OtaSlides.Mode:
        break
      case OtaSlides.WifiSelection:
        this.handleWifiSelection()
        break

      case OtaSlides.Upload:
        this.handleUpload()
        break

      default:
        console.log("unkown slide")  
      //this.log.warn('unknown slide, please define its logic', { slide: this.currentSlide })
    }
  }

 get currentSlide(): OtaSlides {
    let current = this.slides.getActiveIndex()
    const hiddenOffset = this.hiddenSlides.filter(slide => slide <= current).length
    if(current === 3 && this.slideIsHidden(this.slideWifi)){
      // Hotfix for when automatic is selected and Wifi selection slide is hidden
      current +=1;
    }
    return current + hiddenOffset
  }
  slideIsHidden(slide: OtaSlides): boolean {
    return this.hiddenSlides.indexOf(slide) !== -1
  }

  private hideSlide(slide: OtaSlides) {
    if (this.currentSlide === slide) return
    if (this.slideIsHidden(slide)) return
    this.hiddenSlides.push(slide)
    this.slides.update()
  }

  private showSlide(slide:OtaSlides){
    this.hiddenSlides =  this.hiddenSlides.filter((hiddenSlide)=>hiddenSlide!=slide)
    }
  async connectToSensebox(ssid: string) {
    this.counts.connect++
    this.state.wifiSelection = 'connecting'
    try {
      await this.otaWifi.connectToSensebox(ssid)
      this.state.wifiSelection = 'select'
      this.slides.lockSwipeToNext(false)
      this.slides.slideNext()
    } catch (err) {
      this.state.wifiSelection = 'error'
      this.errorMsg = err.message
      this.log.error('could not connect to wifi:', err.message)
    }
  }

  private handleCompilation() {
    this.slides.lockSwipeToNext(!this.compiledSketch)

    // need to go online for compilation. compilation is retriggered via this.onlineSub
    if (!this.state.isOnline) {
      switch (this.otaWifi.strategy) {
        case WifiStrategy.Automatic:
        // TODO: auto connect to previous network, if available
        default:
          this.state.compilation = 'go-online'
          break
      }
    } else {
      this.compileSketch()
    }
  }

  private async handleWifiSelection(force = false) {
    if (this.otaWifi.strategy === WifiStrategy.Automatic) {
      this.slides.lockSwipeToNext(true)

      // skip scan when boxes where already found from the scan on startup
      if (!force && this.availableSenseboxes.length)
        return this.state.wifiSelection = 'select'

      try {
        this.state.wifiSelection = 'scanning'
        // force update of view, as setting subproperties of this.state is not detected automatically :/
        this.changedetect.detectChanges()
        this.availableSenseboxes = await this.otaWifi.findSenseboxes(true)
        this.state.wifiSelection = 'select'
        this.changedetect.detectChanges()
      } catch (err) {
        this.errorMsg = err.message
        this.state.wifiSelection = 'error'
        this.changedetect.detectChanges()
        this.log.error('could not scan wifi:', err.message)
      }
    }
  }

  private async handleUpload() {
    this.counts.upload++
    this.state.upload = 'uploading'
    try {
      
      const res = await this.otaWifi.uploadFirmware(this.compiledSketch,this.OTAAddress)
      this.log.debug(JSON.stringify(res, null, 2))

      this.state.upload = 'done'
      this.slides.lockSwipeToNext(false)
    } catch (err) {
      this.state.upload = 'error'
      this.errorMsg = err.message
      this.log.error('could not upload sketch:', err.message)
    }
  }

  private async compileSketch() {
    this.counts.compile++
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
      this.log.error('could not compile sketch:', err.message)
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
  IP:string,
  message:string
}
// names for the slide indices for easier access
enum OtaSlides {
  Intro = 0,
  // Intro2 = 1,
  Compilation = 1,
  ModeGuide = 2, 
  Mode = 3,
  WifiSelection = 4,
  Upload = 5,
}
