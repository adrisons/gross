import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { SocialComponent } from './social.component';
import { TestComponent } from './test/test.component';
import { TwitterComponent } from './twitter/twitter.component';

const routes: Routes = [
  {
    path: 'social',
    component: SocialComponent, // tiene sus cosas y ... un router-oulet para sus hijos
    children: [ // rutas hijas, se verán dentro del router-oulet componente contenedor
      {
        path: 'twitter', // la ruta real es social/twitter
        component: TwitterComponent
      },
       {
        path: 'test', // la ruta real es social/twitter
        component: TestComponent
      }
    ]
  }
  // {
  //   path: 'movimientos/:id', // parámetro variable id
  //   component: EditorComponent // se verá dentro del router-oulet principal
  // }
];

/**
 * Componentes usados por estas rutas
 * El módulo funcional asociado debe declararlos
 * Para no hacerlo dos veces, se exportan ya sus importaciones locales
 */
export const routableComponents = [
  TwitterComponent,
  TestComponent,
  SocialComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SocialRoutingModule { }
