import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Global } from "./Global";
//Servicio para conectar los metodos de los usuarios del backend con la logica del front end
//Las funciones estan explicadas en el back end
@Injectable()
export class UserService {
    public url: string;
    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    registerUser(user: User): Observable<any> {//historia de usuario Hu12 y el requisito RF0011
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.url}USave`, params, { headers: headers })
    }

    getUsers(): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}users`, { headers: headers });
    }

    getUser(userName: string): Observable<any> {// historia de usuario Hu13 y Hu14
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}user/${userName}`, { headers: headers });
    }

    updateUser(user: User): Observable<any> {//historia de usuario Hu15 y el requisito RF016
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.put(`${this.url}user/${user._id}`, params, { headers: headers });
    }


}