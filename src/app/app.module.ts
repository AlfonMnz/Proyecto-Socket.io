import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ConectionService} from './conection.service';
import {CuerpoComponent} from './cuerpo/cuerpo.component';
import { InicioComponent } from './cuerpo/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    CuerpoComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ConectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
