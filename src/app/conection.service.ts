import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class ConectionService {
  private url = 'http://localhost:3000';
  private socket;
  private id;

  constructor() {
    this.socket = io(this.url);
    this.id = 0;
  }

  nuevo_usuario(user) {
    this.socket.emit('new_user', {usuario: user, num: this.id + 1});

    this.id++;
  }

}
