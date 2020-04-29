import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtaWizardPage } from './ota-wizard.page';

const routes: Routes = [
  {
    path: '',
    component: OtaWizardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtaWizardPageRoutingModule {}
