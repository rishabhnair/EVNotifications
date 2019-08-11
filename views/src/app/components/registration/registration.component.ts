import { Component, OnInit } from '@angular/core';
import { UserInformationService } from 'src/app/user-information.service';
import { Router } from '@angular/router';
import { user } from 'src/app/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private name = '';
  private email = '';
  private password = '';
  user_name: string;
  userInfoServices: UserInformationService;
  router: Router;
  userRegInfo = new user;

  constructor(userInfoServices: UserInformationService, router: Router) {
    this.userInfoServices = userInfoServices;
    this.router = router;
  }

  ngOnInit() {
  }

  addUserRegistrationInfo(registrationData) {
    if (registrationData.invalid) {
        return;
    }
    
    this.name = registrationData.value.name;
    this.email = registrationData.value.email;
    this.password = registrationData.value.password;

    const registrationInfo: user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

    this.userInfoServices.sendRegistrationDataToServer(registrationInfo);
    this.router.navigate(['login']);
    }
  }
