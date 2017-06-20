import { RouterModule, Routes } from '@angular/router';

import { MentionsComponent } from './mentions/mentions.component';
import { NgModule } from '@angular/core';
import { SocialComponent } from './social.component';
import { TwitterComponent } from './twitter/twitter.component';

const routes: Routes = [
  {
    path: 'social',
    component: SocialComponent, // tiene sus cosas y ... un router-oulet para sus hijos
    children: [ // rutas hijas, se verán dentro del router-oulet componente contenedor
      {
        path: 'twitter', // la ruta real es social/twitter
        loadChildren: './twitter/twitter.module#TwitterModule'
      },
       {
        path: 'mentions', // la ruta real es social/twitter
        component: MentionsComponent
      }
    ]
  }
];

/**
 * Componentes usados por estas rutas
 * El módulo funcional asociado debe declararlos
 * Para no hacerlo dos veces, se exportan ya sus importaciones locales
 */
export const routableComponents = [
  MentionsComponent,
  SocialComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SocialRoutingModule { }
