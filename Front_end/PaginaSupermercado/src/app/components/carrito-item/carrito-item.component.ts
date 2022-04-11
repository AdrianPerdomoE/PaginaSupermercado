import { Component, Input, OnInit } from '@angular/core';
import { CarItem } from 'src/app/models/carItem';
import { CarServicesService } from 'src/app/services/car-services.service';
import { Global } from 'src/app/services/Global';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.css']
})
export class CarritoItemComponent implements OnInit {
  @Input() itemCarrito!: CarItem;
  public url: string;
  public clicked = false;
  constructor(
    public carService: CarServicesService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

}
