import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { SocialModule } from './social/social.module';
import { TwitterModule } from './social/twitter/twitter.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    SocialModule,
    TwitterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
