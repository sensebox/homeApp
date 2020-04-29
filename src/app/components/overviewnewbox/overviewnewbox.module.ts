import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverviewnewboxPageRoutingModule } from './overviewnewbox-routing.module';

import { OverviewnewboxPage } from './overviewnewbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverviewnewboxPageRoutingModule
  ],
  declarations: [OverviewnewboxPage]
})
export class OverviewnewboxPageModule {}
