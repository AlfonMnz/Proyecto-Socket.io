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

    });
    this.conectionService.usuarioDesconectado().subscribe((data) => {
      this.array_mensajes.push(data.msg);
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
