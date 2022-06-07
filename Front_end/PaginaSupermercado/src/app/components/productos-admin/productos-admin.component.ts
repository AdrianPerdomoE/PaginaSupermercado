import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product.service';
import { Global } from 'src/app/services/Global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.css'],
  providers: [ProductService]
})
export class ProductosAdminComponent implements OnInit {
  @Input() Admin: boolean | undefined;
  public products: Product[];
  public url: string;
  public search: string;
  constructor(
    private _productService: ProductService,
    private _router: Router,

  ) {
    this.products = [];
    this.url = Global.url;
    this.search = ""
  }

  ngOnInit(): void {
    this.getProducts();
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
  NavigateToProduct(id: string) {

    this._router.navigate([`/Producto/${id}`]);

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

