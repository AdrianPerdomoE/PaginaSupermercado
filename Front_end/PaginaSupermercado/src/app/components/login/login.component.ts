import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/models/user';
import { AutenticationService } from 'src/app/services/autentication.service';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public user: User | undefined
    public usuarios: any;
    public username: string;
    public Password: string;
    public Inicio: string;
    private Usuarios: Array<User>;
    constructor(
        private _auth: AutenticationService,
        private _userService: UserService,
        private _router: Router
    ) {
        this.username = "";
        this.Password = "";
        this.Inicio = "";
        this.Usuarios = [];
    }

    ngOnInit(): void {
        this._userService.getUsers().subscribe(respuesta => {
            if (respuesta) {
                this.Usuarios = respuesta.users;
            }
        })
    }

    login(usuario: any) {
        this._auth.user = usuario
    }

    onSubmit() {
        if (this.username.length == 0) {
            return;
        }
        this.Usuarios.forEach((usuario: User) => {
            if (usuario.UserName == this.username) {
                this._userService.getUser(this.username).subscribe(respuesta => {
                    if (respuesta) {
                        if (respuesta.user.Password == this.Password) {

                            this.login(respuesta.user)
                            this.Inicio = "Success"
                            if (this._auth.isAdmin.value) {
                                this._router.navigate(['/ProductosAdmin']);

                            }
                            if (this._auth.isClient.value) {
                                this._router.navigate(['/Productos']);
                            }

                        }
                        else {

                            this.Inicio = "Failed"
                        }
                    }
                    else {

                        this.Inicio = "Failed"
                    }

                })
                return;
            }
        });
        this.Inicio = "NombreErroneo"
    }
}
