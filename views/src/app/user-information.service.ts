import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { pole } from './pole.model';
import { user } from './user.model';




@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  private poleInformation: pole[];
  private arrayOfPoleObjects: any[];
  private userInfo = {useremail: '', userpassword: ''};
  private registerationInfo = {Users_name: '', Users_email: '', Users_password: ''};
  private confirmationInfo = {email: '', poleID: ''};
  httpClient: HttpClient;

  constructor(private http: HttpClient) {
  }



  fetchPoleData() {
    this.http.get<pole[]>('/api/ev')
      .subscribe(
        (data) => {
          this.poleInformation = data;
          const poleObjects = [];
          let i = 1;
          this.poleInformation.forEach( element => {
            if ( poleObjects.some( e => e.poleNos === i) ) {
              const index = poleObjects.findIndex( e => e.poleNos === i);
              poleObjects[index].poleData.push(element);
              i++;
            } else {
              const newObject = {
                poleNos: i,
                poleData: [element]
              };

              poleObjects.push(newObject);
            }
          });
          this.arrayOfPoleObjects = poleObjects;
        }
      );
  }

  sendRegistrationDataToServer(registrationInfo: user) {

    this.http.post<{message: string}>('/api/register', registrationInfo)
    .subscribe();
  }

  retrievePoleObjects() {
    return this.arrayOfPoleObjects.slice();
  }

  sendLogInDataToServer(email, password) {

    const userInfo = {email, password};

    this.http.post<{message: string}>('/api/login', userInfo)
    .subscribe();
  }

  sendConfirmationDataToServer(email, pole) {
    this.confirmationInfo = {email: email, poleID: pole};
    console.log(this.confirmationInfo);

    this.http.post<{message: string}>('/api/confirm', this.confirmationInfo)
    .subscribe((data) => {
      console.log(data);
      }
    );
  }

  getPoleInfo() {
    return this.poleInformation.slice();
  }

}
