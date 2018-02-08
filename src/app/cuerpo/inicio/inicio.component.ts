import {Component, OnInit} from '@angular/core';
import {ConectionService} from '../../conection.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  user = '';

  constructor(private conectionService: ConectionService) {
  }

  ngOnInit() {
  }

  crearJugador() {
    this.conectionService.nuevo_usuario(this.user);
  }
}
