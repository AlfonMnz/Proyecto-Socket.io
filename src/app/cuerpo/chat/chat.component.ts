import {Component, OnInit} from '@angular/core';
import {ConectionService} from '../../conection.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message = '';
  array_mensajes = [];
  array_usuarios = [];
  listo = false;
  un_usuario_esta_listo = false;
  el_nombre_usuario_listo: any;


  constructor(private conectionService: ConectionService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.array_usuarios = this.conectionService.lista_usuario;
    this.comprobar_si_esta_logueado();
    this.conectionService.recibirMensaje().subscribe((data) => {
      console.log(data);
      this.array_mensajes.push(data);
    });
    this.conectionService.HaLlegadoPoochieEnElChat().subscribe((data) => {
      console.log(data);
      this.array_usuarios = this.conectionService.lista_usuario;
      this.array_mensajes.push(data.msg);

    });
    this.conectionService.usuarioDesconectado().subscribe((data) => {
      this.array_mensajes.push(data.msg);
    });
    this.conectionService.ATodosUsuarioListo().subscribe((data) => {
      console.log('usuario listo', data);
      this.array_mensajes.push(data.msg);
      this.un_usuario_esta_listo = true;
      this.el_nombre_usuario_listo = data.nombre_usuario_listo;
      if (this.listo === true) {
        this.router.navigate(['/juego']);
      }
    });
    this.conectionService.prueba().subscribe((data) => {
      this.listo = data;
      console.log('en el componente', data);
    });
    this.conectionService.recibir_logueado().subscribe((data) => {
      this.router.navigate(['/']);
    });
  }

  enviar_mensaje() {
    console.log('usuario actual', this.conectionService.user);
    this.conectionService.enviar_mensaje({msg: this.message, usuario: this.conectionService.user});
    this.message = '';
  }

  usuario_listo() {
    this.conectionService.usuario_listo();
  }

  otro_usuario_listo() {
    this.conectionService.otro_usuario_listo();
    this.router.navigate(['/juego']);
  }

  comprobar_si_esta_logueado() {
    this.conectionService.comprobar_si_esta_logueado();
  }


}
