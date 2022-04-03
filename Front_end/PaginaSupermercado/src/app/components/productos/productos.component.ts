import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product.service';
import { Global } from 'src/app/services/Global';

@Component({
  selector: 'productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers:[ProductService]
})
export class ProductosComponent implements OnInit {
  public products:Product[];
  public url : string;
  constructor(
    private _productService: ProductService
  ) { 
    this.products = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects(){
    this._productService.getProducts().subscribe(
      response=>{
        if(response.products){
          this.products = response.products;
        }
      }
    );
  }
}
