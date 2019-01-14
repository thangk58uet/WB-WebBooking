import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import {
  Ng6SocialButtonModule,
  SocialServiceConfig
} from "ng6-social-button";

// Configs
export function getAuthServiceConfigs() {
  let config = new SocialServiceConfig()
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng6SocialButtonModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './layout/layout.module#LayoutModule' },
    ])
  ],

  providers: [
    // Below line is optional as default LocationStrategy is PathLocationStrategy
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
