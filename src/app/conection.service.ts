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

  poner_X(fila, columna, figura) {
    this.socket.emit('turno', {fila: fila, columna: columna, figura: figura});
  }

  public HaLlegadoPoochie = () => {
    return Observable.create((observer) => {
      this.socket.on('turno', (data) => {
        observer.next(data);
      });
    });
  };
  public not_turn = () => {
    return Observable.create((observer) => {
      this.socket.on('not_turn', (data) => {
        observer.next(data);
      });
    });
  };
  public your_turn = () => {
    return Observable.create((observer) => {
      this.socket.on('your_turn', (data) => {
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

  /*usuario_listo() {
    this.socket.emit('usuario_listo', this.user);
  }*/

  /*public ATodosUsuarioListo = () => {
    return Observable.create((observer) => {
      this.socket.on('usuario_listo', function (data) {
        observer.next(data);
        console.log(data);
        this.un_usuario_listo = true;
        this.nombre_usuario_listo = data.usuario_listo;


      });

    });
  };*/
  /*public OtroUsuarioListo = () => {
    return Observable.create((observer) => {
      this.socket.on('otro_usuario_listo', function (data) {
        observer.next(data);
      });
    });
  };*/
  /*public prueba = () => {
    return Observable.create((observer) => {
      this.socket.on('prueba', function (data) {
        observer.next(data);
        console.log(data);
      });
    });
  };*/

  /*otro_usuario_listo() {

    this.socket.emit('otro_usuario_listo', this.nombre_usuario_listo);
  }*/

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
  public comenzar_partida = () => {
    return Observable.create((observer) => {
      this.socket.on('comenzar_partida', function (data) {
        observer.next(data);
      });
    });
  };
  public usuario1_listo = () => {
    return Observable.create((observer) => {
      this.socket.on('el_usuario1_esta_listo', function (data) {
        observer.next(data);
      });
    });
  };
  public usuario_2_listo = () => {
    return Observable.create((observer) => {
      this.socket.on('el_usuario2_esta_listo', function (data) {
        observer.next(data);
      });
    });
  };
  public asignar_figuras = () => {
    return Observable.create((observer) => {
      this.socket.on('asignando_figuras', function (data) {
        observer.next(data);
      });
    });
  };

  usuario_listo() {
    this.socket.emit('el_usuario1_esta_listo', 'usuario1');
    this.status_user = true;
  }

  usuario2_listo(usuario1_nombre, usuario2_nombre) {
    this.socket.emit('el_usuario2_esta_listo', {name1: usuario1_nombre, name2: usuario2_nombre});
  }

  iniciar_partida() {
    this.socket.emit('iniciar_partida', 'partida_iniciada');
  }
}
