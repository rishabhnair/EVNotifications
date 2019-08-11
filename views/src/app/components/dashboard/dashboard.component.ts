import { Component, OnInit } from '@angular/core';
import { UserInformationService } from 'src/app/user-information.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private poleData = [];
  userInfoService: UserInformationService;

  constructor(userInfoServices: UserInformationService) { 
    this.userInfoService= userInfoServices;
  }

  ngOnInit() {
    
  }

}
