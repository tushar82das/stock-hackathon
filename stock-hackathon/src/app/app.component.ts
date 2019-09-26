import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stock-hackathon';
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getLoginStatus(this.isLoggedIn);
    this.userService.loginStatus.subscribe(data => {
      this.isLoggedIn = data;
    })
  }
}
