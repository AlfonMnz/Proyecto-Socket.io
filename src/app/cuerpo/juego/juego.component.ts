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
  puntos_fila = [0, 0, 0];
  puntos_columna = [0, 0, 0];

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
    this.conectionService.ha_ganado().subscribe((data) => {
      alert('el usuario' + data + 'ha ganado');
    });
  }

  enviar_mensaje() {
    console.log('usuario actual', this.conectionService.user);
    this.conectionService.enviar_mensaje({msg: this.message, usuario: this.conectionService.user});
    this.message = '';
  }

  clickeado(fila, columna, valor) {
    if (this.turno === true) {
      if (this.array_celdas[fila][columna] !== '') {
        alert('esta celda está clickada ya ');
      } else {
        console.log(this.array_celdas[(fila)][(columna)]);
        this.conectionService.poner_X(fila, columna, this.figura);
        this.puntos_fila[fila] += valor;
        this.puntos_columna[columna] += valor;
        if (this.haGanado()) {
          this.conectionService.ganador();
        }
        console.log('polla');
      }
    } else {
      console.log('no es tu turno camarada');
    }
  }

  haGanado() {
    console.log(this.puntos_columna);
    console.log(this.puntos_fila);
    /* Comprobamos filas */
    if (this.puntos_fila[0] === 7 || this.puntos_fila[1] === 56 || this.puntos_fila[2] === 448) {
      console.log('ha ganado');
      return true;
    }
    if (this.puntos_columna[0] === 73 || this.puntos_columna[1] === 146 || this.puntos_columna[2] === 292) {
      console.log('ha ganado');
      return true;
    }
    /* Comprobamos columnas */
    else {
      return false;
    }
  }

  comprobar_si_esta_logueado() {
    this.conectionService.comprobar_si_esta_logueado();
  };

  iniciar_partida() {
    this.conectionService.iniciar_partida();
  }

}
