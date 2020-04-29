import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterWizardPageRoutingModule } from './register-wizard-routing.module';

import { RegisterWizardPage } from './register-wizard.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterWizardPageRoutingModule,
    TranslateModule
  ],
  declarations: [RegisterWizardPage]
})
export class RegisterWizardPageModule {}
