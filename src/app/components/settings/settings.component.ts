import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  private loginInformation;
  private language:string = 'de'
  constructor(public popoverController: PopoverController, public router: Router, navParams: NavParams,
    public translate: TranslateService
  ) {
    this.loginInformation = navParams.data[0]
    console.log(this.loginInformation)

  }

  signOut() {
    this.router.navigate(['login'])
    this.popoverController.dismiss();
  }

  addNewBox() {
    let navigationExtras:NavigationExtras={
      state:{
        token:this.loginInformation.token,
        refreshToken:this.loginInformation.refreshToken
      }
    }
    this.router.navigate(['newbox'],navigationExtras)
    this.popoverController.dismiss();
  }

  switchLanguage() {
    console.log("switching language")
    if(this.language === 'en') this.translate.use('de');
    if(this.language === 'de') this.translate.use('en');

  }

  ngOnInit() { }

}
