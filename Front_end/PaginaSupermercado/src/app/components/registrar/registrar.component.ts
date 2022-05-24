import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  public user: User;
  public savedUser: User;
  public status: string;
  public Users: User[];
  constructor(
    private _userService: UserService
  ) {
    this.status = "";
    this.user = new User("", "", "", "", 0, "", "CLIENTE")
    this.savedUser = new User("", "", "", "", 0, "", "CLIENTE")
    this.Users = []
  }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(
      response => {
        if (response) {
          this.Users = response.users
        }
      }
    )
  }
  VerificarNickUnico() {
    let count = 0
    this.Users.forEach(usuario => {
      if (usuario.UserName == this.savedUser.UserName) {
        count++;
      }
    });
    return count == 0;
  }

  onRegistry(userForm: any) {
    this.savedUser = this.user
    if (!this.VerificarNickUnico()) {
      this.status = "NombreUsuarioExiste"
      return;
    }
    this._userService.registerUser(this.savedUser).subscribe(
      response => {
        if (response.user) {
          this.status = "Success";
        }
        else {
          this.status = "Failed";
        }
        userForm.reset()
      }
    )

  }

}
