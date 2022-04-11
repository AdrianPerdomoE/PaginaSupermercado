import { Component, Input, OnInit } from '@angular/core';
import { CarItem } from 'src/app/models/carItem';
import { Global } from 'src/app/services/Global';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.css']
})
export class CarritoItemComponent implements OnInit {
  @Input() itemCarrito?: CarItem;
  public url;
  constructor() {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

}
