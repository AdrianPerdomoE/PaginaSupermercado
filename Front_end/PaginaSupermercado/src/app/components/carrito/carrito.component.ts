import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarItem } from 'src/app/models/carItem';
import { CarServicesService } from 'src/app/services/car-services.service';
import { TablaIVA } from 'src/app/services/TablaIVA';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public ListaCarrito?: Array<CarItem>;
  public tablaIva: Array<any>;
  verTotal = false;
  constructor(
    private carService: CarServicesService,
    private _router: Router
  ) {
    this.ListaCarrito = undefined;
    this.tablaIva = TablaIVA;
  }

  ngOnInit(): void {
    this.ListaCarrito = this.carService.getCarItems();

  }
  ValorIva(item: any) {
    let iva = 0;
    this.tablaIva.forEach(elem => {
      if (elem.codigo == item.codigo) {
        iva = elem.IVA
        return;
      }
    });
    return iva;
  }
  total() {
    var total = 0;
    this.ListaCarrito?.forEach(item => {
      let iva = this.ValorIva(item);
      total += item.precio * item.cantidad * (1 + iva);
    });
    return total;
  }
  subtotal() {
    var total = 0;
    this.ListaCarrito?.forEach(item => {
      total += item.precio * item.cantidad;
    });
    return total;
  }


  pagar() {
    this._router.navigate(['/Pagar']);
  }
}
