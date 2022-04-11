import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  private _user?: User = undefined;
  isAdmin = new BehaviorSubject(false);
  get user(): User { return this._user ?? (JSON.parse(sessionStorage.getItem("loginUser") ?? "")); }
  set user(value: User) {
    sessionStorage.setItem("loginUser", JSON.stringify(value));
    this._user = value;
    this.isAdmin.next(value.rol == "ADMIN");
  }
  constructor() { }
}
