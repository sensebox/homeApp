import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewboxPage } from './newbox.page';

const routes: Routes = [
  {
    path: '',
    component: NewboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewboxPageRoutingModule {}
