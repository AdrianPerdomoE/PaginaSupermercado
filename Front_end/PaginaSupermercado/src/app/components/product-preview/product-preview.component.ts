import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CarServicesService } from 'src/app/services/car-services.service';
import { Global } from 'src/app/services/Global';
@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {
  @Input() product!: Product; //obligatorio
  public url;
  public clicked: boolean = false;
  public SeeMore: boolean = false;
  constructor(
    public carService: CarServicesService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }
  ajustarValorCantidad(cantidadReferece: any) {
    if (cantidadReferece.valueAsNumber > this.product.cantidad) {
      cantidadReferece.valueAsNumber = this.product.cantidad;
      return;
    }
    if (cantidadReferece.valueAsNumber < 0) {
      cantidadReferece.valueAsNumber = 1;
    }
  }

}
