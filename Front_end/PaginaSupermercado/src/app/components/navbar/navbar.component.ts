import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'src/app/services/autentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public NoSesionIniciada;
  constructor(
    public _auth: AutenticationService

  ) {
    this.NoSesionIniciada = _auth.isAdmin && _auth.isClient
  }
  LinksAdmin = ["Crear-Producto", "ProductosAdmin", "CarritoCompra", "Login", "Perfil"];
  LinksCliente = ["Productos", "CarritoCompra", "Login", "Registrar", "Perfil"]
  Links = ["Productos", "CarritoCompra", "Login", "Registrar"]
  ngOnInit(): void {

  }
}
