import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/account-page.component/register-page.component/register-page.component';
import { LoginComponent } from './components/account-page.component/login-page.component/login-page.component';
import { UserPageComponent } from './components/user-page.component/user-page.component';
import { UsersPageComponent } from './components/users-page.component/users-page.component';
import { JobOffersPageComponent } from './components/job-offers-page.component/job-offers-page.component';
import { JobOfferPageComponent } from './components/job-offers-page.component/job-offer-page.component/job-offer-page.component';
import { ReportsPageComponent } from './components/reports-page.component/reports-page.component';
import { ReportPageComponent } from './components/reports-page.component/report-page.component/report-page.component';
import { BugPageComponent } from './components/bugs-page.component/bug-page.component/bug-page.component';
import { BugsPageComponent } from './components/bugs-page.component/bugs-page.component';
import { CompaniesPageComponent } from './components/companies-page.component/companies-page.component';
import { CompanyPageComponent } from './components/companies-page.component/company-page.component/company-page.component';

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
    component: ReportPageComponent,
    title: 'Zgłoszenie'
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
    title: 'Zgłoszenia'
  },
  {
    path: 'bug/:bgid',
    component: BugPageComponent,
    title: 'Błąd'
  },
  {
    path: 'bugs',
    component: BugsPageComponent,
    title: 'Błędy'
  },
  {
    path: 'company/:cgid',
    component: CompanyPageComponent,
    title: 'Firma'
  },
  {
    path: 'companies',
    component: CompaniesPageComponent,
    title: 'Firmy'
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
