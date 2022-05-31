import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'src/app/services/autentication.service';
import { FacturaService } from 'src/app/services/Factura.service';
import { Factura } from 'src/app/models/Factura';
import { CarItem } from 'src/app/models/carItem';
import { Global } from 'src/app/services/Global';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public items: Array<any> = [];
  public dineroTotal = 0;
  public url = Global.url;
  constructor(
    public _auth: AutenticationService,
    public _facturaService: FacturaService
  ) { }

  ngOnInit(): void {
    this._facturaService.getProducts(this._auth.isClient ? this._auth.user.UserName : " ").subscribe((response) => {
      if (response) {
        response.facturas.forEach((element: Factura) => {
          this.dineroTotal += element.total;
          element.detalles.forEach(detalle => {
            var detalleJson = JSON.parse(detalle);
            var nuevoitem = true;
            this.items.forEach((item: CarItem) => {
              if (detalleJson._id == item._id) {
                item.cantidad += detalleJson.cantidad;
                nuevoitem = false;
              }
            });
            if (nuevoitem) {
              this.items.push(detalleJson);
            }
          });

        });
        this.items.sort((a: CarItem, b: CarItem) => { return b.cantidad - a.cantidad; })
      }
    });
  }
}

