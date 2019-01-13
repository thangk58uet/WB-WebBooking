import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { PopupTourInfoComponent } from './component/details-du-thuyen/popup-tour-info/popup-tour-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupTourInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './layout/layout.module#LayoutModule' },
    ])
  ],

  providers: [
    // Below line is optional as default LocationStrategy is PathLocationStrategy
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
