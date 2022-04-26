import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//importar http y formularios de angular
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ErrorComponent } from './components/error/error.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductosAdminComponent } from './components/productos-admin/productos-admin.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';
import { LoginComponent } from './components/login/login.component';
import { ProductService } from './services/Product.service';
import { AdminGuard } from './guards/admin.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarritoItemComponent } from './components/carrito-item/carrito-item.component';
import { LogoComponent } from './components/logo/logo.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
@NgModule({
  declarations: [
    AppComponent,
    CrearProductoComponent,
    ProductosComponent,
    ProductoComponent,
    ErrorComponent,
    EditarProductoComponent,
    CarritoComponent,
    ProductosAdminComponent,
    ProductPreviewComponent,
    LoginComponent,
    NavbarComponent,
    CarritoItemComponent,
    LogoComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
