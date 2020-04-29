import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxPageRoutingModule } from './box-routing.module';

import { BoxPage } from './box.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxPageRoutingModule,
    TranslateModule
  ],
  declarations: [BoxPage]
})
export class BoxPageModule {}
