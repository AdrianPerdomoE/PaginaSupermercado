import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//importar http y formularios de angular
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
@NgModule({
  declarations: [
    AppComponent,
    CrearProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
