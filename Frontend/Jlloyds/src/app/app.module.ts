import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminComponent } from './admin/admin.component';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NotifierModule.withConfig( {
      position: {        
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        },
        horizontal: {
          position: 'middle',
          distance: 12
        },
      }
    } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
