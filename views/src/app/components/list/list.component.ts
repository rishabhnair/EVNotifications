import { Component, OnInit } from '@angular/core';
import { UserInformationService } from 'src/app/user-information.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  poles: any[];
  userInfoServices: UserInformationService;

  constructor(userInfoServices: UserInformationService) {
    this.userInfoServices= userInfoServices;
   }

  ngOnInit() {
    this.poles = this.userInfoServices.retrievePoleObjects();
    console.log(this.poles);
  }

}
