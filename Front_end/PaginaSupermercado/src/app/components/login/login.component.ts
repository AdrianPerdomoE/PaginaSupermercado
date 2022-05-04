import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/models/user';
import { AutenticationService } from 'src/app/services/autentication.service';
import { UserService } from 'src/app/services/User.service';


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
    constructor(
        private _auth: AutenticationService,
        private _userService: UserService
    ) {
        this.username = "";
        this.Password = "";
        this.Inicio = "";
    }

    ngOnInit(): void {
    }

    login(usuario: any) {
        this._auth.user = usuario
    }

    onSubmit() {
        if (this.username.length == 0) {
            return;
        }
        this._userService.getUser(this.username).subscribe(respuesta => {
            if (respuesta) {
                if (respuesta.user.Password == this.Password) {

                    this.login(respuesta.user)
                    this.Inicio = "Success"
                }
                else {

                    this.Inicio = "Failed"
                }
            }
            else {

                this.Inicio = "Failed"
            }

        })


    }
}
