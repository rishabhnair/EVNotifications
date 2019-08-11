import { Component, OnInit } from '@angular/core';
import { UserInformationService } from 'src/app/user-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username = '';
  private password = '';
  userInfoServices: UserInformationService;
  router: Router;

  constructor(userInfoServices: UserInformationService, router: Router) {
    this.userInfoServices = userInfoServices;
    this.router = router;
  }

  ngOnInit() {
  }

  addUserInfo(userData) {

    if (userData.invalid) {
      return;
    }

    this.username = userData.value.email;
    this.password = userData.value.password;
    this.userInfoServices.sendLogInDataToServer(this.username, this.password);
    this.router.navigate(['dashboard']);
  }
}
