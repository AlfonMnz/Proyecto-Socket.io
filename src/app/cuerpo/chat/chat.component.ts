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

  constructor(private conectionService: ConectionService) {
  }

  ngOnInit() {
    this.conectionService.recibirMensaje().subscribe((data) => {
      console.log(data);
      this.array_mensajes.push(data);
    });
  }

  enviar_mensaje() {
    this.conectionService.enviar_mensaje(this.message);
    this.message = '';
  }

}
