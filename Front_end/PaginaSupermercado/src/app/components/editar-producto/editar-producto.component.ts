import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product.service';
import { UploadFileService } from 'src/app/services/UploadFile.service';
import { Global } from 'src/app/services/Global';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
  providers:[ProductService,UploadFileService]
})
export class EditarProductoComponent implements OnInit {
  public title:string;
  public product:Product;
  public status:string;
  public filesToUpload:Array<File>;
  public url:string;
  constructor(
    private _route:ActivatedRoute,
    private _productService:ProductService,
    private _uploadFileService:UploadFileService
  ) {
    this.title = "Editar Producto";
    this.status = "";
    this.filesToUpload = new Array<File>();
    this.product = new Product("","","",0,0,"","");
    this.url = Global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id = params["id"];
      this.getProduct(id);
    });
  }

  getProduct(id:string){
    this._productService.getProduct(id).subscribe(
      response=>{
        this.product = response.product;
      }
    );
  }

  onSubmit(){
    this._productService.updateProduct(this.product).subscribe(
      response=>{
        if(response.product){
          if(this.filesToUpload.length>=1){
            this._uploadFileService.makeFileRequest(`${this.url}UploadImagen/${this.product._id}`,[],this.filesToUpload,"imagen").then(((result:any)=>{}));
          }
          this.status = "Success";
        }
        else{
          this.status = "Failed"
        }
        scrollTo(0,0);  
      }
    );
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
