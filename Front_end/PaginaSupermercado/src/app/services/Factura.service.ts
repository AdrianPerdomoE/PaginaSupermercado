import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Factura } from "../models/Factura";
import { Global } from "./Global";

@Injectable()
export class FacturaService {
    public url: string;
    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    saveFactura(Factura: Factura): Observable<any> {
        let params = JSON.stringify(Factura);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.post(`${this.url}SaveFactura`, params, { headers: headers });
    }

    getProducts(comprador: string): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetFacturas/${comprador}`, { headers: headers });
    }
    getProduct(id: string): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetFactura/${id}`, { headers: headers });
    }
}