import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];

export const routableComponents = [
  HomeComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
