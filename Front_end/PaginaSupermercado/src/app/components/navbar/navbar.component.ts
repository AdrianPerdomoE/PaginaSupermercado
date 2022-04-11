import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public _auth: AutenticationService
  ) { }
  LinksAdmin = ["Crear-Producto", "ProductosAdmin", "CarritoCompra", "Login"];
  Links = ["Productos", "CarritoCompra", "Login"]
  ngOnInit(): void { }
}
