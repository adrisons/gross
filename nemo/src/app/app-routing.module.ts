import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SocialComponent } from './social/social.component';

const routes: Routes = [
   {
    path: '',
    children: [ // rutas hijas, se verán dentro del router-oulet componente contenedor
      {
        path: 'social', // la ruta real es social/twitter
        component: SocialComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
