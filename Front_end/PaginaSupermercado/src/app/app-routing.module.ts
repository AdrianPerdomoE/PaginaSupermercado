import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importar rutas
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';
//Añadir ruta a la lista
const routes: Routes = [
  {path:"Crear-Producto",component:CrearProductoComponent},
  {path:"Productos",component:ProductosComponent},
  {path:"Producto/:id",component:ProductoComponent},
  {path:"**",component:CrearProductoComponent}//crear componente de error
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
