import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product.service';
import { Global } from 'src/app/services/Global';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers:[ProductService]
})
export class ProductoComponent implements OnInit {
  public url: string;
  public product:Product;
  public confirm:boolean;
  constructor(
    private _productService:ProductService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
      this.url = Global.url;
      this.product = new Product("","","",0,0,"","");
      this.confirm = false;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id = params["id"];
      this.getProduct(id);
    })
  }
  getProduct(id:string){
    this._productService.getProduct(id).subscribe(
      response=>{
        this.product = response.product;
      }
    );
  }

  deleteProduct(id:string){
    this._productService.deleteProduct(id).subscribe(
      response=>{
        if(response.product){
          this._router.navigate(['/Productos']);
        }
      }
    );
  }

}
