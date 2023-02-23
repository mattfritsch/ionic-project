import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicNewPageRoutingModule } from './comic-new-routing.module';

import { ComicNewPage } from './comic-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicNewPageRoutingModule
  ],
  declarations: [ComicNewPage]
})
export class ComicNewPageModule {}
