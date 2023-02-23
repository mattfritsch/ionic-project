import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComicsListPage } from './comics-list.page';

const routes: Routes = [
  {
    path: '',
    component: ComicsListPage
  },
  {
    path: 'new',
    loadChildren: () => import('./comic-new/comic-new.module').then(m => m.ComicNewPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./comic/comic.module').then(m => m.ComicPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicsListPageRoutingModule {}
