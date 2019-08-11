import { Component, OnInit } from '@angular/core';
import { UserInformationService } from 'src/app/user-information.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  name = '';
  email = '';
  pole = '';
  location = '';
  private user = '';
  poleId = '';
  busyStatus = '';
  router: Router;
  activeRoute: ActivatedRoute;
  userInfoServices: UserInformationService;

  constructor(userInfoServices: UserInformationService, router: Router, activeRoute: ActivatedRoute) {
    this.router = router;
    this.userInfoServices = userInfoServices;
    this.activeRoute = activeRoute;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe( params => {
      this.poleId = params.id;
      this.busyStatus = params.busy;
      this.pole = params.pole;
      this.location = params.location;
    }
    )
  }

  submitConfirmation(confirmationData) {
    this.user = confirmationData.value.email;
    this.userInfoServices.sendConfirmationDataToServer(this.user, this.poleId);
    this.router.navigate(['dashboard']);
  }

}
