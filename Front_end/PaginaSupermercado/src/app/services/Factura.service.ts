import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Factura } from "../models/Factura";
import { Global } from "./Global";

@Injectable()
//Servicio para conectar los metodos del servidor en el backend con la logica del frontend
export class FacturaService {
    public url: string;
    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    saveFactura(Factura: Factura): Observable<any> { //Metodo para guardar una factura en la colección de la base de datos relacionado con la historia de usuario Hu11 y el requisito RL002
        let params = JSON.stringify(Factura);
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.post(`${this.url}SaveFactura`, params, { headers: headers });
    }

    getFacturas(comprador: string = ""): Observable<any> {//Metodo para buscar las facturas, si se ingrese el nombre de usuario la busqueda es por el comprador, propiedad de la factura, si es vacio, se devuelven todas las facturas, relacionado a las historias de usuario Hu16-Hu19 y requisitos RF0018 RF0019
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetFacturas/${comprador}`, { headers: headers });
    }
    getFactura(id: string): Observable<any> {//Metodo para buscar una factura por id y devolver el elemento
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}GetFactura/${id}`, { headers: headers });
    }
}