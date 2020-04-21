import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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
  constructor(public modalController: ModalController,navParams: NavParams) { 
   this.box = navParams.data[0]
   this.sensors = navParams.data[1]
  
    }

  dismissModal(){
    // forward to api 
  }
  ngOnInit() {
  }

}
