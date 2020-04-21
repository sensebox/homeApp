import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-overviewnewbox',
  templateUrl: './overviewnewbox.page.html',
  styleUrls: ['./overviewnewbox.page.scss'],
})
export class OverviewnewboxPage implements OnInit {
  @Input() form:Object;
  box:any
  constructor(public modalController: ModalController,navParams: NavParams) { 

   this.box = navParams.data
    }

  dismissModal(){
    // forward to api 
  }
  ngOnInit() {
  }

}
