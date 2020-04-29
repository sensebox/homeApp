import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SketchPage } from './sketch.page';

const routes: Routes = [
  {
    path: '',
    component: SketchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SketchPageRoutingModule {}
