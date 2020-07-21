import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router, } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  private language: string = 'en'
  constructor(
    private authentication: AuthenticationService,
    private storage: Storage,
    public popoverController: PopoverController,
    public router: Router,
    public navParams: NavParams,
    public translate: TranslateService
  ) {

  }

  signOut() {

    this.storage.get('token').then((token)=>{
      this.authentication.logout(token)
    })
    this.storage.remove('useremail')
    this.storage.remove('userpw')
    this.router.navigate(['login'])
    this.popoverController.dismiss();
  }

  addNewBox() {
    this.popoverController.dismiss();
    this.router.navigate(['newbox'])
  }

  switchLanguage() {
    switch (this.language) {
      case 'de':
        this.translate.use('en')
        this.language = 'en'
        break;
      case 'en':
        this.translate.use('de')
        this.language = 'de'
  
      default:
        break;
    }

  }

  ngOnInit() { }

}
