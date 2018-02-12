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
  private selector;
  array_celdas = [['', '', ''],
                  ['', '', ''],
                  ['', '', '']];


  constructor(private conectionService: ConectionService) {
  }

  ngOnInit() {
    this.conectionService.HaLlegadoPoochie().subscribe((data) => {
      this.array_celdas[data.fila][data.columna] = 'x';
      console.log(data);


    });
  }

  clickeado(fila, columna) {
    console.log(this.array_celdas[(fila)][(columna)]);
    this.conectionService.poner_X(fila, columna);


  }


}
