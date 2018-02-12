import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConectionService {
  private url = 'http://localhost:3000';
  private socket;
  private id;
  user: any;
  private celda: any;
  lista_usuario = []

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


}
