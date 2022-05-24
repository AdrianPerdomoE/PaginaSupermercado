import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";
import { Global } from "./Global";

@Injectable()
export class ProductService {
    public url: string;
    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    saveProduct(product: Product): Observable<any> {
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.post(`${this.url}SaveProduct`, params, { headers: headers });
    }

    getProducts(): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetProducts`, { headers: headers });
    }

    getProduct(id: string): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetProduct/${id}`, { headers: headers });
    }

    deleteProduct(id: string): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.delete(`${this.url}DeleteProduct/${id}`, { headers: headers });
    }

    updateProduct(product: Product): Observable<any> {
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.put(`${this.url}UpdateProduct/${product._id}`, params, { headers: headers });
    }
    getAll(filter: any): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetAll/${filter}`, { headers: headers })
    }
}