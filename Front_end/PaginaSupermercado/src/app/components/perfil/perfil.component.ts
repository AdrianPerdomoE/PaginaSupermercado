import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public UsuarioConectado: User | undefined = undefined

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    let usuario = sessionStorage.getItem("loginUser");
    if (usuario) {
      this.UsuarioConectado = JSON.parse(usuario)
    }
  }

  Cambiarpassword() {
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
}
