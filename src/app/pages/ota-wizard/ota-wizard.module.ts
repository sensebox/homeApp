import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtaWizardPageRoutingModule } from './ota-wizard-routing.module';

import { OtaWizardPage } from './ota-wizard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtaWizardPageRoutingModule
  ],
  declarations: [OtaWizardPage]
})
export class OtaWizardPageModule {}
