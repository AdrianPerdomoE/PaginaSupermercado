import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";
import { Global } from "./global";

@Injectable()
export class ProductService{
    public url: String;
    constructor(private _http:HttpClient){
        this.url = Global.url;
    }
    
    createHeaders():HttpHeaders {
        return new HttpHeaders().set("Content-Type","application/json");
    }
    saveProduct(product:Product): Observable<any>{
        let params = JSON.stringify(product);
        let headers = this.createHeaders();
        return this._http.post(`${this.url}SaveProduct`,params,{headers:headers});
    }

    getProducts():Observable<any>{
        let headers = this.createHeaders();
        return this._http.get(`${this.url}GetProducts`,{headers:headers});
    }

    getProduct(id:string):Observable<any>{
        let headers = this.createHeaders();
        return this._http.get(`${this.url}GetProduct/${id}`,{headers:headers});
    }

    deleteProduct(id:String): Observable<any>{
        let headers = this.createHeaders();
        return this._http.delete(`${this.url}DeleteProduct/${id}`,{headers:headers});
    }

    updateProduct(product:Product): Observable<any>{
        let params = JSON.stringify(product);
        let headers = this.createHeaders();
        return this._http.put(`${this.url}UpdateProduct/${product}`,params,{headers:headers});
    }
}