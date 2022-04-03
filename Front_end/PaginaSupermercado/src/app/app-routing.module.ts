import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importar rutas
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
//Añadir ruta a la lista
const routes: Routes = [
  {path:"Crear-Producto",component:CrearProductoComponent},
  {path:"**",component:CrearProductoComponent}//crear componente de error
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
