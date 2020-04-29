import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SketchPageRoutingModule } from './sketch-routing.module';

import { SketchPage } from './sketch.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SketchPageRoutingModule,
    TranslateModule
  ],
  declarations: [SketchPage]
})
export class SketchPageModule {}
