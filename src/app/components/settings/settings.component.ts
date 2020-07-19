import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router, } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  private language: string = 'en'
  constructor(public popoverController: PopoverController, public router: Router, navParams: NavParams,
    public translate: TranslateService
  ) {

  }

  signOut() {
    this.router.navigate(['login'])
    this.popoverController.dismiss();
  }

  addNewBox() {
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
