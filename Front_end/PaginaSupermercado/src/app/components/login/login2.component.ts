import {Component, OnInit} from '@angular/core'
import { User } from 'src/app/models/user';
import { AutenticationService } from 'src/app/services/autentication.service';
import { UserService } from 'src/app/services/User.service';


@Component({
    selector: 'app-login2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent2 implements OnInit{
    public user: User
    let users: User[] = [];
    constructor(
        private _auth: AutenticationService,
    ){
        private _userService = UserService
    }
    
    ngOnInit(){
        this._userService.getUsers().subscribe(
            response=>{
                this.usuarios = response.users;
            })
    }
    login(userForm:any){
        this._userService.getUser()
    }
    VerificarUser(username, password){
        usuarios.forEach(usuario => {
            if(usuario.usermane == usernaeme && usuario.pass == password){
                return usuario;
            }
            return null;
        });
    }(
    onsubmit(suernaem, pass){
        respuesta = verificar()
        if(respuesta){
            if(respuesta.rol == admin){
                isAdmin()
            }
            else if(respuesta.rol == "cliente"){
                isCliente()
            }
            Inicio = "Sucess"
            return
        }
        return "Falied"
    }
}

