import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public SesionIniciada;
  constructor(
    public _auth: AutenticationService
  ) { 
    this.SesionIniciada = _auth.isAdmin || _auth.isClient
  }

  ngOnInit(): void {
    
  }

}
