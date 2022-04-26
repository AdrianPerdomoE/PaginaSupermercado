import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  public user : User;
  public savedUser: User;
  public status: string;
  constructor(
    private _userService : UserService
  ) {
    this.status = "";
    this.user = new User("","","","",0, "")
    this.savedUser = new User("","","","",0, "")
  }

  ngOnInit(): void {
  }
  onRegistry(userForm:any){
    this._userService.registerUser(this.user).subscribe(
      response =>{
        if(response){
          this.status = "Success";
        }
        else{
          this.status = "Failed";
        }
        userForm.reset()
      }
    )
  }

}
