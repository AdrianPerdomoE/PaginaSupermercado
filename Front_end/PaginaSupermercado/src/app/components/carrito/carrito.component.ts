import { Component, OnInit } from '@angular/core';
import { CarItem } from 'src/app/models/carItem';
import { CarServicesService } from 'src/app/services/car-services.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public ListaCarrito?: Array<CarItem>;
  verTotal = false;
  constructor(
    private carService: CarServicesService
  ) {
    this.ListaCarrito = undefined;
  }

  ngOnInit(): void {
    this.ListaCarrito = this.carService.getCarItems();
  }

  total() {
    var total = 0;
    this.ListaCarrito?.forEach(item => {
      total += item.precio * item.cantidad;
    });
    return total;
  }

  pagar() {
    this.carService.removeCarItems();
  }
}
