import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product.service';
import { Global } from 'src/app/services/Global';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
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
    private _router: Router,
  ) {
    this.products = [];
    this.url = Global.url;
    this.status = "";
    this.search="Lacteo"
  }

  ngOnInit(): void {
    this.getProjects()
  }
  getProjects() {
    this._productService.getProducts().subscribe(
      response => {
        if (response.products) {
          this.products = response.products;
        }
      }
    );
  }
  Loadproduct(){
    let filter = ""
    if (this.search.length > 0){
      filter = this.search
    }
    else{
      return
    }
    this._productService.getAll(filter).subscribe(
      response=>{
        if (response.products) {
          console.log(this.search)
          this.products = response.products;
        }
      }
    )
  }
}
