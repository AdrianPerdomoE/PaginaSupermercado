import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CarItem } from '../models/carItem';
import { Product } from '../models/Product';
import { ProductService } from './Product.service';

@Injectable({
  providedIn: 'root'
})//este servicio nos permite manejar los elementos del carrito y su interacion con los productos en la base de datos
export class CarServicesService {

  public carUpdated$ = new Subject<string>();
  constructor(
    private _productService: ProductService
  ) { }

  addToCar(product: Product, cantidad: number): void {//Metodo para añadir una cantidad de un producto a un carrito de  compra como item carrito y disminuir esa cantidad en la propiedad del producto, esta relacionado a la historia de usuario Hu6 y el requisito RF007
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

  takeOutCarItem(carItem: CarItem, cantidad: number): void {//Metodo para sacar una cantidad de un producto del carrito de compra, esta relacionado con la historia de usuario Hu8 y RF008
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
                  this.carUpdated$.next("ItemRemoved")
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

  getCarItems(): Array<CarItem> {//Metodo para devolver los elementos guardados en el carrito, relacionado a la historia de usuario Hu5 
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

  removeCarItems(): void {//Metodo para eliminar todos los items de carrito, se usa para limpiar el carrito despues de finalizar la compra , relacionado a la historia de usuario Hu11
    localStorage.clear();
  }
}
