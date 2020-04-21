import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyDisclaimerPage } from './privacy-disclaimer.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyDisclaimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyDisclaimerPageRoutingModule {}
