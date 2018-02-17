import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ConectionService} from './conection.service';
import {CuerpoComponent} from './cuerpo/cuerpo.component';
import {InicioComponent} from './cuerpo/inicio/inicio.component';
import {ChatComponent} from './cuerpo/chat/chat.component';
import {HeaderComponent} from './header/header.component';
import {JuegoComponent} from './cuerpo/juego/juego.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'juego', component: JuegoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CuerpoComponent,
    InicioComponent,
    ChatComponent,
    HeaderComponent,
    JuegoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [ConectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
