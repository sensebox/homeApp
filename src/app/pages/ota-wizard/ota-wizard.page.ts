import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {OtawifiService} from '../../services/otawifi/otawifi.service'
import {WebcompilerService} from '../../services/webcompiler/webcompiler.service'
 
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
  private OTAAddress;

  constructor(private route:ActivatedRoute,private router:Router,private otawifi: OtawifiService,private webcompiler: WebcompilerService) {
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

  async onSlideChange() {
    let currentSlide = await Promise.resolve(this.slides.getActiveIndex());
  //  this.slideHistory.push(OtaSlides[currentSlide])
    console.log("currentslide",currentSlide)
    switch (currentSlide) {
      case OtaSlides.Intro:
        this.handleIntro();
        break
      case OtaSlides.Scan:
        this.handleScanInit()
        //if(this.modus == undefined) this.slides.lockSwipeToNext(true);
        break
      case OtaSlides.Compilation:
        this.handleCompilation()
        break
      case OtaSlides.Upload:
        this.handleUpload()
        break

      default:
        console.log("unkown slide")  
      //this.log.warn('unknown slide, please define its logic', { slide: this.currentSlide })
    }
  }
  handleScanInit(){
    console.log("handleScanInit")
  }

  handleUpload(){
    console.log("handleUpload");
  }
  handleWifiSelection(){
    console.log("handleWifiSelection");
  }

  handleIntro(){
    console.log(this.sketch);
  }

  private async handleCompiling(){
    
    const compiledSketch = await this.webcompiler.compile(this.sketch);
    console.log(compiledSketch);
    
    this.slides.slideNext();
  }

  handleScan(){
    console.log("handleScan()");
    this.otawifi.scanNetwork()
    this.slides.slideNext();
  }
  private showSlide(slide:OtaSlides){
    this.hiddenSlides =  this.hiddenSlides.filter((hiddenSlide)=>hiddenSlide!=slide)
    }

  private handleCompilation() {
    this.slides.lockSwipeToNext(!this.compiledSketch)

    // need to go online for compilation. compilation is retriggered via this.onlineSub
    if (!this.state.isOnline) {
          this.state.compilation = 'go-online'
      }
     else {
      this.compileSketch()
    }
  }



  private compileSketch() {

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
  Compilation = 4,
  Scan = 1 , 
  Upload = 2
}
