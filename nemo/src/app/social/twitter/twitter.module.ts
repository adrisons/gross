import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TwitterRoutingModule } from './twitter-routing.module';
import { routableComponents } from './twitter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TwitterRoutingModule
  ],
  declarations: [routableComponents]
})
export class TwitterModule { }
