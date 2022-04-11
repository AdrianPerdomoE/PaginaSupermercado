import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _auth: AutenticationService
  ) { }

  ngOnInit(): void {
  }
  loginAdmin() {
    this._auth.user = { nombre: "Admin", rol: "ADMIN" }
  }
  loginNoAdmin() {
    this._auth.user = { nombre: "non" }
  }
}
