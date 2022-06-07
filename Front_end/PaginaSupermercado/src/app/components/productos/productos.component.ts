import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product.service';
import { Global } from 'src/app/services/Global';
@Component({
  selector: 'productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductService]
})
export class ProductosComponent implements OnInit {
  @Input() Admin: boolean | undefined;
  public products: Product[];
  public url: string;
  public status: string;
  public search: string;
  constructor(
    private _productService: ProductService,
  ) {
    this.products = [];
    this.url = Global.url;
    this.status = "";
    this.search = ""
  }

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        if (response.products) {
          this.products = response.products;
        }
      }
    );
  }
  Loadproduct() {
    let filter = ""
    if (this.search.length > 0) {
      filter = this.search
    }
    else {
      this.getProducts()
      return;
    }
    this._productService.getAll(filter).subscribe(
      response => {
        if (response.products) {
          this.products = response.products;
        }
      }
    )
  }
}
