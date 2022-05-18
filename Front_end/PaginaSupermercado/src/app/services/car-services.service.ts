import { Injectable } from '@angular/core';
import { CarItem } from '../models/carItem';
import { Product } from '../models/Product';
import { ProductService } from './Product.service';

@Injectable({
  providedIn: 'root',
})
export class CarServicesService {


  constructor(
    private _productService: ProductService
  ) { }

  addToCar(product: Product, cantidad: number): void {
    product.cantidad -= cantidad;
    if (localStorage.getItem(product.nombre) == null) {
      var carItem = {
        _id: product._id,
        nombre: product.nombre,
        cantidad: cantidad,
        precio: product.precio,
        imagen: product.imagen,
        codigo: product.codigo
      };
      localStorage.setItem(product.nombre, JSON.stringify(carItem));
    }
    else {
      var Item = localStorage.getItem(product.nombre);
      if (Item != null) {
        var JsonItem = JSON.parse(Item);
        JsonItem.cantidad += cantidad;
        localStorage.setItem(product.nombre, JSON.stringify(JsonItem));
      }
    }
    this._productService.updateProduct(product).subscribe(
      {
        next: (response) => {
          if (response.product) { }
        },
        error(err: any): void {
          console.log(<any>err);
        },
        complete(): void { }
      }
    );
  }

  takeOutCarItem(carItem: CarItem, cantidad: number): void {
    var product = new Product("", "", "", 0, 0, "", "", 0);
    this._productService.getProduct(carItem._id).subscribe(
      response => {
        product = response.product;
        product.cantidad += cantidad;
        carItem.cantidad -= cantidad;
        this._productService.updateProduct(product).subscribe(
          {
            next: (response) => {
              if (response.product) {
                if (carItem.cantidad == 0) {
                  localStorage.removeItem(carItem.nombre);
                  return;
                }
                localStorage.setItem(carItem.nombre, JSON.stringify(carItem));
              }
            },
            error(err: any): void {
              console.log(<any>err);
            },
            complete(): void { }
          }
        );
      }
    );
  }

  getCarItems(): Array<CarItem> {
    var listaCarItems = new Array();
    for (let i = 0; i < localStorage.length; i++) {
      var nombre = localStorage.key(i);
      if (nombre != null && localStorage.getItem(nombre) != null) {
        var item = localStorage.getItem(nombre);
        listaCarItems.push(JSON.parse(item ?? ""));
      }
    }
    return listaCarItems;
  }

  removeCarItems(): void {
    localStorage.clear();
  }
}
