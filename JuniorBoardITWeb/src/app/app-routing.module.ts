import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/account-page.component/register-page.component/register-page.component';
import { LoginComponent } from './components/account-page.component/login-page.component/login-page.component';
import { UserPageComponent } from './components/user-page.component/user-page.component';
import { UsersPageComponent } from './components/users-page.component/users-page.component';
import { JobOffersPageComponent } from './components/job-offers-page.component/job-offers-page.component';
import { JobOfferPageComponent } from './components/job-offers-page.component/job-offer-page.component/job-offer-page.component';
import { ReportsPageComponent } from './components/reports-page.component/reports-page.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Rejestracja'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Logowanie'
  },
  {
    path: 'user',
    component: UserPageComponent,
    title: 'Użytkownik'
  },
  {
    path: 'user/:ugid',
    component: UserPageComponent,
    title: 'Użytkownik'
  },
  {
    path: 'users',
    component: UsersPageComponent,
    title: 'Użytkownicy'
  },
  {
    path: 'job-offer/:jogid',
    component: JobOfferPageComponent,
    title: 'Oferta Pracy'
  },
  {
    path: 'job-offers',
    component: JobOffersPageComponent,
    title: 'Oferty Pracy'
  },
  {
    path: 'report/:rgid',
    component: ReportsPageComponent,
    title: 'Zgłoszenie'
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
    title: 'Zgłoszenia'
  },
  {
    path: '**',
    component: JobOffersPageComponent,
    title: 'Oferty Pracy'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
