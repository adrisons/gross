import { RouterModule, Routes } from '@angular/router';

import { MentionsComponent } from './mentions/mentions.component';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { ReplyComponent } from './reply/reply.component';
import { TwitterComponent } from './twitter.component';

const routes: Routes = [
  {
    path: '',
    component: TwitterComponent,
    children: [ // rutas hijas, se verán dentro del router-oulet componente contenedor
      {
        path: 'post', // la ruta real es social/twitter/post
        component: PostComponent
      },
      {
        path: 'reply', // la ruta real es social/twitter/reply
        component: ReplyComponent
      },
      {
        path: 'mentions', // la ruta real es social/twitter/mentions
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
  PostComponent,
  ReplyComponent,
  MentionsComponent,
  // ParserComponent, // No enrutable
  TwitterComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TwitterRoutingModule { }
