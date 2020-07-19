import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PrivacyDisclaimerPage } from './components/privacy-disclaimer/privacy-disclaimer.page';
import {OverviewnewboxPage} from './components/overviewnewbox/overviewnewbox.page'
import { SettingsComponent } from './components/settings/settings.component';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import {HttpErrorInterceptor} from './services/HttpIntercep/HttpIntercep'
import { IonicStorageModule } from '@ionic/storage';
// For AoT compilation (production builds) we need to have a factory for the loader of translation files.
// @TODO: we possibly could optimize this by using a static loader in combination with webpack:
// https://github.com/ngx-translate/http-loader#angular-cliwebpack-translateloader-example
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  // add components/pages here that are not loaded via routing 
  declarations: 
  [AppComponent,SettingsComponent,OverviewnewboxPage],
  entryComponents: [SettingsComponent,OverviewnewboxPage],
  imports: [
    IonicStorageModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(), AppRoutingModule
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    HttpErrorInterceptor,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
