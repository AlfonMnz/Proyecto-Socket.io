import {Component, OnInit} from '@angular/core';
import {ConectionService} from '../../conection.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  private celda: EventTarget;
  private turno = false;

  constructor(private conectionService: ConectionService) {
  }

  ngOnInit() {

  }

  clickeado(event) {
    this.celda = event.currentTarget;
    this.celda.innerHTML = 'X';

  }

}
