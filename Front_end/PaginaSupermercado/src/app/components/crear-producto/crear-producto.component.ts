import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Product.service';
import { UploadFileService } from 'src/app/services/UploadFile.service';
import { Global } from 'src/app/services/Global';

@Component({
  selector : 'crear-producto',
  templateUrl : './crear-producto.component.html',
  styleUrls : ['./crear-producto.component.css'],
  providers : [ProductService, UploadFileService]
})
export class CrearProductoComponent implements OnInit {
  public title : string;
  public product : Product;
  public status : string;
  public filesToUpload : Array<File>;
  public savedProduct : Product;
  constructor(
    private _productService : ProductService,
    private _UploadFileService : UploadFileService
  ) { 

    this.title = "Crear Producto";
    this.product = new Product("","","",0,0,"","");
    this.status = "";
    this.filesToUpload = new Array<File>();
    this.savedProduct = new Product("","","",0,0,"","");
  }

  ngOnInit(): void {
  }
  onSubmit(productForm:any){
    //guardar el producto en la base de datos
    this._productService.saveProduct(this.product).subscribe(
      response=>{
        if(response){
          //Subir la imagen
          if(this.filesToUpload.length>=1){
            this._UploadFileService.makeFileRequest(`${Global.url}UploadImagen/${response.product._id}`,[],this.filesToUpload,"image").then((result:any)=>{
              this.savedProduct = result.productUpdated;
            });
          }
          this.status = "Success";
        }
        else{
          this.status = "Failed";
        }
        productForm.reset();
      }
    );
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
