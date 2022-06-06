import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";
import { Global } from "./Global";
//Servicio para conectar los metodos del backend de los productos con la logica del front end
//Sus funciones ya estan explicadas en el back end
@Injectable()
export class ProductService {
    public url: string;
    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    saveProduct(product: Product): Observable<any> {//Historia de usuario HU1 y el requisito RF001
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.post(`${this.url}SaveProduct`, params, { headers: headers });
    }

    getProducts(): Observable<any> {//historia de usuario Hu4 y el requisito RF005
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetProducts`, { headers: headers });
    }

    getProduct(id: string): Observable<any> {//Requisito RF004
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetProduct/${id}`, { headers: headers });
    }

    deleteProduct(id: string): Observable<any> {// historia de usuario Hu2 y el requisito RF002
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.delete(`${this.url}DeleteProduct/${id}`, { headers: headers });
    }

    updateProduct(product: Product): Observable<any> {//historia de usuario Hu3 y el requisito RF003
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.put(`${this.url}UpdateProduct/${product._id}`, params, { headers: headers });
    }
    getAll(filter: any): Observable<any> {//historia de usuario Hu7 y el requisito RF0017
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetAll/${filter}`, { headers: headers })
    }
}