import { SocialRoutingModule, routableComponents } from './social-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SocialComponent } from './social.component';

@NgModule({
  imports: [
    CommonModule,
    SocialRoutingModule
  ],
  declarations: [routableComponents]  // importados desde el módulo de enrutado
})
export class SocialModule { }
