import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewboxPageRoutingModule } from './newbox-routing.module';

import { NewboxPage } from './newbox.page';
import { PrivacyDisclaimerPage } from '../../components/privacy-disclaimer/privacy-disclaimer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewboxPageRoutingModule,
    TranslateModule
  ],
  declarations: [NewboxPage]
})
export class NewboxPageModule {}
