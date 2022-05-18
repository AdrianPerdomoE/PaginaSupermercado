import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AutenticationService } from 'src/app/services/autentication.service';
import { Router } from '@angular/router';
import { CarServicesService } from 'src/app/services/car-services.service';
import { Factura } from 'src/app/models/Factura';
import { FacturaService } from 'src/app/services/Factura.service';
import { TablaIVA } from 'src/app/services/TablaIVA';
@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
  public user: User = { _id: "", direccion: "", edad: 0, nombre: "", Password: "", UserName: "", rol: "" }
  public email: string = "";
  public cuenta: string = "";
  public clave: string = "";
  public itemsCarrito;
  public tablaIva;
  medioPago: number = -1;
  listaMediosPago = ["Credito", "Debito", "contra entrega"]
  continuar: boolean = false;
  constructor(private _facturaService: FacturaService, private _router: Router, private _auth: AutenticationService, private _carService: CarServicesService) {
    this.itemsCarrito = this._carService.getCarItems();
    this.tablaIva = TablaIVA;
  }

  ngOnInit(): void {
    this.user = this._auth.isAdmin.value || this._auth.isClient.value ? this._auth.user : this.user;
  }
  onSubmit(form: any) {
    let detalles: Array<string> = []
    this.itemsCarrito.forEach(item => {
      detalles.push(JSON.stringify(item))
    })
    let nuevaFactura = new Factura("", this.user.UserName, this.listaMediosPago[this.medioPago], this.user.direccion, this.email, detalles, this.subtotal(), this.total());
    this._facturaService.saveFactura(nuevaFactura).subscribe(response => {
      let html =
        `
    <h1>Su pago por ${this.listaMediosPago[this.medioPago]} ha sido procesado exitosamente <h/1>
    <h2>Factura</h2>
    <div class="factura">
      <p>Comprador: ${this.user.nombre}</p>
      <p>Direccion del envio: ${this.user.direccion}</p>
      <p>Correo electronico: ${this.email}</p>
      <p>MEDIO DE PAGO: ${this.listaMediosPago[this.medioPago]}</p>
      <p>SUBTOTAL: ${this.subtotal()}</p>
      <p> TOTAL incluyendo impuestos: ${this.total()}</p>
    </div>
    `
      const ALERTA = document.createElement("div");
      ALERTA.innerHTML = html;
      ALERTA.className = "alerta";
      document.body.appendChild(ALERTA);
      ALERTA.addEventListener("click", event => {
        if (event.target !== event.currentTarget) {
          return;
        }
        ALERTA.remove();
        this._router.navigate(['/Productos']);
      })
      this._carService.removeCarItems();
    });

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
    this.itemsCarrito?.forEach(item => {
      let iva = this.ValorIva(item);
      total += item.precio * item.cantidad * (1 + iva);
    });
    return total;
  }
  subtotal() {
    var total = 0;
    this.itemsCarrito?.forEach(item => {
      total += item.precio * item.cantidad;
    });
    return total;
  }
  cancelar() {
    this._router.navigate(['/CarritoCompra']);
  }
}
