import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Global } from "./Global";

@Injectable()
export class UserService{
    public url: string;
    constructor(private _http:HttpClient){
        this.url = Global.url;
    }

    registerUser(user: User): Observable<any>{
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.url}USave`, params, {headers:headers})
    }

    getUser(UserName:string):Observable<any>{
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}user/${UserName}`, {headers:headers});
    }

    updateUser(user:User): Observable<any>{
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.put(`${this.url}user/${user._id}`, params, {headers:headers});
    }

    
}