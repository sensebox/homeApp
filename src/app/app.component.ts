import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate : TranslateService
  ) {
    this.translate.addLangs(['en', 'de']);
    this.translate.use('de');

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this._initTranslate();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }


  private _initTranslate() 
  {
     // Set the default language for translation strings, and the current language.
     this.translate.setDefaultLang('en');


     if (this.translate.getBrowserLang() !== undefined) 
     {
         this.translate.use(this.translate.getBrowserLang());
     } 
     else 
     {
         this.translate.use('en'); // Set your language here
     }
  }
}
