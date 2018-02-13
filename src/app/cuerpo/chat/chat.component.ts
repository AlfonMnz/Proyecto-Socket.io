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


  constructor(private conectionService: ConectionService) {
  }

  ngOnInit() {
    this.array_usuarios = this.conectionService.lista_usuario;
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
    });
    this.conectionService.prueba().subscribe((data) => {
      this.listo = data;
      console.log('en el componente', data);
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


}
