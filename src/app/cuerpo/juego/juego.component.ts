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
    this.conectionService.turno().subscribe((data) => {
      console.log(data);
      data.setInnerHTML('X');
    });
  }

  clickeado(event) {
    this.conectionService.poner_X(event.currentTarget);
  }

}
