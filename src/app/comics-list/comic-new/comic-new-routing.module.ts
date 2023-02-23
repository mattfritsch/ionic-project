import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComicNewPage } from './comic-new.page';

const routes: Routes = [
  {
    path: '',
    component: ComicNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicNewPageRoutingModule {}
