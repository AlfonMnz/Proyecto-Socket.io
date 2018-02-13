import {Component, OnInit} from '@angular/core';
import {ConectionService} from '../../conection.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  user = '';

  constructor(private conectionService: ConectionService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.conectionService.comprobarUsuario().subscribe((data) => {
      if (data === 'error') {
        this.user = window.prompt('El nombre de usuario está en uso');
        this.crearJugador();
      } else {
        alert('adelante compañero');
        console.log(data.user);
        this.router.navigate(['/chat']);
      }
    });
  }

  crearJugador() {
    this.conectionService.nuevo_usuario(this.user);
  }
}
