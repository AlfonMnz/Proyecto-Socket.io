import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConectionService {
  private url = 'http://localhost:3000';
  private socket;
  private id;
  private user: any;

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
        this.user = data.usuario;
      });
    });
  };

  enviar_mensaje(msg) {
    this.socket.emit('new_message', {usuario: this.user, contenido: msg});
  }

  public recibirMensaje = () => {
    return Observable.create((observer) => {
      this.socket.on('new_message', (msg) => {
        observer.next(msg);
      });
    });
  }
}
