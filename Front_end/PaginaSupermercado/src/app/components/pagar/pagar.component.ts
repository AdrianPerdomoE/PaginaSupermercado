import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
  user: User = { _id: "", direccion: "", edad: 0, nombre: "", Password: "", UserName: "", rol: "" }
  medioPago: number = -1;
  constructor(private _auth: AutenticationService) { }

  ngOnInit(): void {
    this.user = this._auth.isAdmin.value || this._auth.isClient.value ? this._auth.user : this.user;
  }
  onSubmit(form: any) {

  }
}
