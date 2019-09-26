import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isLoginError: boolean = false; /*Declare isLoginError flag*/
  username: string = ''; /*Declare username variable*/
  password: string = ''; /*Declare password variable*/

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getLoginStatus(false);
  }

  /*This function is used for user login*/
  userLogin() {
    if (this.username != '' && this.password != '') {
      this.isLoginError = false;
      var data = {
        emailId: this.username,
        password: this.password
      };

      this.userService.userLogin(data).subscribe(data => {
        console.log(data);
        if (data != undefined && data != null) {
          if (data.status == "SUCCESS") {
            this.userService.getLoginStatus(true);
            this.isLoginError = false;
            if (typeof (Storage) !== "undefined") {
              localStorage.setItem("user", JSON.stringify(data));
            }
            this.router.navigate(['/dashboard']);
          } else {
            this.isLoginError = true;
          }
        }
      });

    } else {
      this.isLoginError = true;
    }
  }

}
