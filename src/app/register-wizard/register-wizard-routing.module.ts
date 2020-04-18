import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterWizardPage } from './register-wizard.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterWizardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterWizardPageRoutingModule {}
