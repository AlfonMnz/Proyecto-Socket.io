import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConectionService {
  private url = 'http://localhost:3000';
  private socket;
  private id;
  user = '';
  status_user: any;
  private celda: any;
  lista_usuario = [];
  private un_usuario_listo: any;
  private nombre_usuario_listo: any;

  constructor() {
    this.socket = io(this.url);
    this.id = 0;
  }

  nuevo_usuario(user) {
    this.socket.emit('new_user', {usuario: user, num: this.id + 1});

    this.id++;
  }

  public comprobarUsuario = () => {
    return Observable.create((observer) => {
      this.socket.on('error_new_user', (data) => {
        observer.next(data);
      });
      this.socket.on('usuario_correcto', (data) => {
        observer.next(data);
        console.log('usuario correcto', data);
        this.user = data.user;
        this.status_user = data.status;
        this.lista_usuario = data.usuarios_disponibles;
      });
    });
  };

  enviar_mensaje(msg) {
    this.socket.emit('new_message', msg);
  }

  public recibirMensaje = () => {
    return Observable.create((observer) => {
      this.socket.on('new_message', (msg) => {
        observer.next(msg);
      });
    });
  };

  poner_X(fila, columna) {
    this.socket.emit('turno', {fila: fila, columna: columna});
  }

  public HaLlegadoPoochie = () => {
    return Observable.create((observer) => {
      this.socket.on('turno', (data) => {
        observer.next(data);
      });
    });
  };
  public HaLlegadoPoochieEnElChat = () => {
    return Observable.create((observer) => {
      this.socket.on('ha llegado un nuevo usuario', (data) => {
        observer.next(data);
        this.lista_usuario = data.usuarios_disponibles;
      });
    });
  };
  public usuarioDesconectado = () => {
    return Observable.create((observer) => {
      this.socket.on('desconexion', (data) => {
        observer.next(data);
        this.lista_usuario = data.usuarios_disponibles;
      });
    });
  };

  usuario_listo() {
    this.socket.emit('usuario_listo', this.user);
  }

  public ATodosUsuarioListo = () => {
    return Observable.create((observer) => {
      this.socket.on('usuario_listo', function (data) {
        observer.next(data);
        console.log(data);
        this.un_usuario_listo = true;
        this.nombre_usuario_listo = data.usuario_listo;


      });

    });
  };
  public prueba = () => {
    return Observable.create((observer) => {
      this.socket.on('prueba', function (data) {
        observer.next(data);
        console.log(data);
      });
    });
  };

  otro_usuario_listo() {

    this.socket.emit('otro_usuario_listo', this.user);
  }

  comprobar_si_esta_logueado() {
    this.socket.emit('comprobar_si_esta_logueado', 'data');
  }

  public recibir_logueado = () => {
    return Observable.create((observer) => {
      this.socket.on('no_esta_logueado', function (data) {
        observer.next(data);
      });
    });
  };
}
