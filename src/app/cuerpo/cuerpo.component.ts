import {Component, OnInit} from '@angular/core';
import {ConectionService} from '../conection.service';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {
  user = 'KJJJJ';


  constructor(private conectionService: ConectionService) {
  }

  ngOnInit() {
  }

  crearJugador() {
    console.log('usuario', this.user);
    this.conectionService.nuevo_usuario(this.user);

  }
}
