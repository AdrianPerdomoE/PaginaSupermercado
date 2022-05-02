import {Component, OnInit} from '@angular/core'
import { User } from 'src/app/models/user';
import { AutenticationService } from 'src/app/services/autentication.service';
import { UserService } from 'src/app/services/User.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    public user: User | undefined
    public usuarios: any;
    public username: string;
    public Password: string;
    public Inicio: string;

    users: User[] = [];
    constructor(
        private _auth: AutenticationService,
        private _userService: UserService
    ){
      this.username = "";
      this.Password = "";
      this.Inicio= "";
    }

    ngOnInit(): void {
        if (this._userService != undefined){
            this._userService.getUsers().subscribe(
                response=>{
                    this.usuarios = response.users;
            })
        }
    }
    
    VerifyUser( username: any, password: any){
        this.usuarios.forEach((usuario: { UserName: any; Password: any; }) => {
            if(usuario.UserName == username && usuario.Password == password){
                return usuario;
            }
            return null;
        });
    }

    loginAdmin(usuario: any) {
        this._auth.user = usuario
      }
    
    loginNoAdmin(usuario: any) {
        this._auth.user = usuario
    }

    onSubmit(username: any, password: any){
        let respuesta: any
        respuesta = this.VerifyUser(username, password)
        if(respuesta != null){
            if(respuesta.rol == "admin"){
                this.loginAdmin(respuesta)
            }
            else if(respuesta.rol == "cliente"){
                this.loginNoAdmin(respuesta)
            }
            this.Inicio = "Success"
        }
        this.Inicio = "Failure"
    }
}
