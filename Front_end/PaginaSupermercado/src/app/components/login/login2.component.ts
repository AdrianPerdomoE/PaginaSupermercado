import {Component, OnInit} from '@angular/core'
import { AutenticationService } from 'src/app/services/autentication.service';
import { UserService } from 'src/app/services/User.service';


@Component({
    selector: 'app-login2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent2 implements OnInit{
    constructor(
        private _auth: AutenticationService,
        private _userService : UserService
    ){ }
    
    ngOnInit():void{

    }
    login(userForm:any){
        this._userService.getUser()
    }
}

