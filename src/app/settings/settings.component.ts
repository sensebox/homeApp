import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(public popoverController: PopoverController, public router:Router) { }

  signOut(){
    this.router.navigate(['login'])
    this.popoverController.dismiss();
  }

  addNewBox(){
    this.router.navigate(['newbox'])
    this.popoverController.dismiss();
  }

  switchLanguage(lang){
    console.log("switching language")
  }

  ngOnInit() {}

}
