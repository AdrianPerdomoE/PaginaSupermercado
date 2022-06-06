import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importar rutas
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ErrorComponent } from './components/error/error.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductosAdminComponent } from './components/productos-admin/productos-admin.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

import { PagarComponent } from './components/pagar/pagar.component';
//Añadir ruta a la lista
//estas rutas permiten vincular un texto en el url a un componente 
const routes: Routes = [
  { path: "", redirectTo: "Productos", pathMatch: "full" },
  { path: "Login", component: LoginComponent },
  { path: "Crear-Producto", component: CrearProductoComponent, canActivate: [AdminGuard] },
  { path: "Productos", component: ProductosComponent },
  { path: "Producto/:id", component: ProductoComponent, canActivate: [AdminGuard] },
  { path: "EditarProducto/:id", component: EditarProductoComponent, canActivate: [AdminGuard] },
  { path: "CarritoCompra", component: CarritoComponent },
  { path: "ProductosAdmin", component: ProductosAdminComponent, canActivate: [AdminGuard] },
  { path: "Registrar", component: RegistrarComponent },
  { path: "Perfil", component: PerfilComponent },
  { path: "Estadisticas", component: EstadisticasComponent },
  { path: "Pagar", component: PagarComponent },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
