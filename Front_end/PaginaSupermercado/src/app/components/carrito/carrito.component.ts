import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CarItem } from 'src/app/models/carItem';
import { CarServicesService } from 'src/app/services/car-services.service';
import { TablaIVA } from 'src/app/services/TablaIVA';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, OnDestroy {
  private unSub$ = new Subject<void>();
  public ListaCarrito?: Array<CarItem>;
  public tablaIva: Array<any>;
  public get carritoTieneItems() {
    if (!this.ListaCarrito) {
      return false;
    }
    return this.ListaCarrito.length > 0;
  }
  verTotal = false;
  constructor(
    private carService: CarServicesService,
    private _router: Router
  ) {
    this.ListaCarrito = undefined;
    this.tablaIva = TablaIVA;
  }
  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.complete();
  }

  ngOnInit(): void {
    this.ListaCarrito = this.carService.getCarItems();
    this.carService.carUpdated$.pipe(takeUntil(this.unSub$)).subscribe(
      {
        next: () => {
          this.ListaCarrito = this.carService.getCarItems();
        }
      }
    )

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
