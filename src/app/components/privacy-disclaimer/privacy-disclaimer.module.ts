import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyDisclaimerPageRoutingModule } from './privacy-disclaimer-routing.module';

import { PrivacyDisclaimerPage } from './privacy-disclaimer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyDisclaimerPageRoutingModule,
    TranslateModule
  ],
  declarations: [PrivacyDisclaimerPage]
})
export class PrivacyDisclaimerPageModule {}
