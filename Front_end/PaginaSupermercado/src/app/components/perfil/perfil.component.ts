import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/services/autentication.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public UsuarioConectado: User | undefined = undefined

  constructor(private _userService: UserService, private _router: Router, private _auth: AutenticationService) { }

  ngOnInit(): void {//Metodo para obtener el usuario con sesion iniciada 
    let usuario = sessionStorage.getItem("loginUser");
    if (usuario) {
      this.UsuarioConectado = JSON.parse(usuario)
    }
  }

  Cambiarpassword() {//Metodo para cambiar la contraseña del usuario, relacionado a Hu15 y RF016
    if (this.UsuarioConectado) {
      this._userService.updateUser(this.UsuarioConectado).subscribe(
        response => {
          if (response) {
            sessionStorage.setItem("loginUser", JSON.stringify(response.user))
            alert("Contraseña guardada y cambiada correctamente")
          }

        }
      )
    }

  }

  CerrarSesion() {//Metodo para cerrar la sesion actual
    sessionStorage.clear()
    this._auth.user = new User("", "", "", "", 0, "")
    this._router.navigate(['/Productos'])
  }
}
