import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-overviewnewbox',
  templateUrl: './overviewnewbox.page.html',
  styleUrls: ['./overviewnewbox.page.scss'],
})
export class OverviewnewboxPage implements OnInit {
  @Input() form:Object;
  @Input() sensors:Array<Object>;
  box:any
  sensorlist:any
  constructor(public modalController: ModalController,navParams: NavParams, private loadingController: LoadingController) { 
   this.box = navParams.data[0]
   this.sensors = navParams.data[1]
  
    }
  dismissModal(){
    this.modalController.dismiss();
  }
  async handleConfirmation(){
    // forward to api 
    this.modalController.dismiss()

    const loading = await this.loadingController.create({
      message:'Please wait...',
      duration:2000
    })
    await loading.present();

    loading.onDidDismiss().then(()=>console.log("finished "))
  }

  ngOnInit() {
  }

}
