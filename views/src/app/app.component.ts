import { Component, OnInit } from '@angular/core';
import { UserInformationService } from './user-information.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userInfoServices: UserInformationService

  constructor(userInfoServices: UserInformationService) {
    
    this.userInfoServices= userInfoServices;
  } 

  ngOnInit() {

    this.userInfoServices.fetchPoleData();
  }
}
