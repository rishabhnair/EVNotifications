import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavigationTabsComponent } from './components/navigation-tabs/navigation-tabs.component';
import { ListComponent } from './components/list/list.component';
import { FooterComponent } from './components/footer/footer.component';
import { PoleComponent } from './components/pole/pole.component';
import { UserInformationService } from './user-information.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'confirm/:pole/:busy/:id/:location', component: ConfirmationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ConfirmationComponent,
    DashboardComponent,
    LandingPageComponent,
    NavigationTabsComponent,
    ListComponent,
    FooterComponent,
    PoleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [UserInformationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
