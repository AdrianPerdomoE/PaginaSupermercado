import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticationService } from 'src/app/services/autentication.service';
import { FacturaService } from 'src/app/services/Factura.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public SesionIniciada;
  public listaFacturas: Observable<any> | undefined;
  constructor(
    public _auth: AutenticationService,
    private _facturaService: FacturaService
  ) {
    this.SesionIniciada = _auth.isClient
  }

  ngOnInit(): void {
    this.listaFacturas = this._facturaService.getProducts()
  }

}
