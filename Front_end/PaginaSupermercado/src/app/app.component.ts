import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PaginaSupermercado';
  Links = ["Crear-Producto","Productos"];
  enrutar(link:string){
    return `/${link}`;
  }
}
