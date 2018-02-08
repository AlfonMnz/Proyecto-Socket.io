import {Component, OnInit} from '@angular/core';
import {ConectionService} from '../conection.service';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {



  constructor(private conectionService: ConectionService) {
  }

  ngOnInit() {
  }


}
