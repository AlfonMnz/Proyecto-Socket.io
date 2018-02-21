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
  usuario1_nombre: any;
  usuario2_nombre: any;

  un_usuario_esta_listo = false;
  el_nombre_usuario_listo: any;
  usuario1_listo = false;


  constructor(public conectionService: ConectionService, private route: ActivatedRoute, private router: Router) {
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
    this.conectionService.usuario1_listo().subscribe((data) => {
      this.usuario1_nombre = data;
      this.usuario1_listo = true;

    });
    this.conectionService.usuario_2_listo().subscribe((data) => {
      this.usuario1_listo = false;
      if (data.name1 === this.conectionService.user) {
        this.router.navigate(['/juego']);
      }
    });
    /*this.conectionService.ATodosUsuarioListo().subscribe((data) => {
      console.log('usuario listo', data);
      this.array_mensajes.push(data.msg);
      this.un_usuario_esta_listo = true;
      this.el_nombre_usuario_listo = data.nombre_usuario_listo;
      if (this.listo === true) {
        this.router.navigate(['/juego']);
      }
    });*/
    /*this.conectionService.prueba().subscribe((data) => {
      this.listo = data;
      console.log('en el componente', data);
    });*/
    /*this.conectionService.OtroUsuarioListo().subscribe((data) => {
      if (this.listo == true) {
        this.router.navigate(['/juego']);
      }
    });*/
    this.conectionService.recibir_logueado().subscribe((data) => {
      this.router.navigate(['/']);
    });
    /*this.conectionService.comenzar_partida().subscribe((data) => {
      this.router.navigate(['/juego']);
    });*/
  }

  enviar_mensaje() {
    console.log('usuario actual', this.conectionService.user);
    this.conectionService.enviar_mensaje({msg: this.message, usuario: this.conectionService.user});
    this.message = '';
  }

  usuario_listo() {
    this.conectionService.usuario_listo();
    this.listo = true;
  }


  comprobar_si_esta_logueado() {
    this.conectionService.comprobar_si_esta_logueado();
  }

  usuario2_listo() {
    this.usuario2_nombre = this.conectionService.user
    this.conectionService.usuario2_listo(this.usuario1_nombre, this.usuario2_nombre);


    this.router.navigate(['/juego']);

  }


}
