import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AutenticationService } from "../services/autentication.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private _auth: AutenticationService,
        private _router: Router
    ) { }
    canActivate(): boolean {
        if (this._auth.user.nombre == "") {
            this._router.navigate([`/Login`]);
        }
        return this._auth.isAdmin.value;
    }

}