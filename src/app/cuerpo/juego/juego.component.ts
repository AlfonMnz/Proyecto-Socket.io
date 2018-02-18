import {Component, OnInit} from '@angular/core';
import {ConectionService} from '../../conection.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  array_mensajes = [];
  message = '';
  figura: any;

  constructor(private conectionService: ConectionService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.comprobar_si_esta_logueado();
    this.iniciar_partida();
    this.conectionService.HaLlegadoPoochie().subscribe((data) => {
      this.array_celdas[data.fila][data.columna] = data.figura;
      console.log(data);

    });
    this.conectionService.not_turn().subscribe((data) => {
      this.turno = data;
    });
    this.conectionService.your_turn().subscribe((data) => {
      this.turno = data;
    });
    this.conectionService.recibirMensaje().subscribe((data) => {
      console.log(data);
      this.array_mensajes.push(data);
    });
    this.conectionService.recibir_logueado().subscribe((data) => {
      this.router.navigate(['/']);
    });
    this.conectionService.asignar_figuras().subscribe((data) => {
      if (this.conectionService.user == data) {
        this.figura = 'x';
        this.turno = true;
      } else {
        this.figura = 'o';
      }
    });
  }

  enviar_mensaje() {
    console.log('usuario actual', this.conectionService.user);
    this.conectionService.enviar_mensaje({msg: this.message, usuario: this.conectionService.user});
    this.message = '';
  }

  clickeado(fila, columna) {
    if (this.turno === true) {
      console.log(this.array_celdas[(fila)][(columna)]);
      this.conectionService.poner_X(fila, columna, this.figura);
    } else {
      console.log('no es tu turno camarada');
    }
  }

  comprobar_si_esta_logueado() {
    this.conectionService.comprobar_si_esta_logueado();
  };

  iniciar_partida() {
    this.conectionService.iniciar_partida();
  }

}
