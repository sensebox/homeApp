import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-disclaimer',
  templateUrl: './privacy-disclaimer.page.html',
  styleUrls: ['./privacy-disclaimer.page.scss'],
})
export class PrivacyDisclaimerPage implements OnInit {

  constructor(private modalController: ModalController) { }

  dismissModal(){
    this.modalController.dismiss();
  }
  
  ngOnInit() {
  }

}
