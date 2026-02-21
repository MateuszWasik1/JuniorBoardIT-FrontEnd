import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import Aura from '@primeng/themes/aura';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountEffects } from './components/account-page.component/account-page-state/account-page-state.effects';
import { AccountReducer } from './components/account-page.component/account-page-state/account-page-state.reducer';
import { featureKeyAccountState } from './components/account-page.component/account-page-state/account-page-state.state';
import { BugsEffects } from './components/bugs-page.component/bugs-page-state/bugs-page-state.effects';
import { BugsReducer } from './components/bugs-page.component/bugs-page-state/bugs-page-state.reducer';
import { featureKeyBugsState } from './components/bugs-page.component/bugs-page-state/bugs-page-state.state';
import { CompaniesEffects } from './components/companies-page.component/companies-page-state/companies-page-state.effects';
import { CompaniesReducer } from './components/companies-page.component/companies-page-state/companies-page-state.reducer';
import { featureKeyCompaniesState } from './components/companies-page.component/companies-page-state/companies-page-state.state';
import { JobOffersEffects } from './components/job-offers-page.component/job-offers-page-state/job-offers-page-state.effects';
import { JobOfferReducer } from './components/job-offers-page.component/job-offers-page-state/job-offers-page-state.reducer';
import { featureKeyJobOffersState } from './components/job-offers-page.component/job-offers-page-state/job-offers-page-state.state';
import { ReportsEffects } from './components/reports-page.component/reports-page-state/reports-page-state.effects';
import { ReportsReducer } from './components/reports-page.component/reports-page-state/reports-page-state.reducer';
import { featureKeyReportsState } from './components/reports-page.component/reports-page-state/reports-page-state.state';
import { StatsEffects } from './components/stats-page.component/stats-page-state/stats-page-state.effects';
import { StatsReducer } from './components/stats-page.component/stats-page-state/stats-page-state.reducer';
import { featureKeyStatsState } from './components/stats-page.component/stats-page-state/stats-page-state.state';
import { UserEffects } from './components/user-page.component/user-page-state/user-page-state.effects';
import { UserReducer } from './components/user-page.component/user-page-state/user-page-state.reducer';
import { featureKeyUserState } from './components/user-page.component/user-page-state/user-page-state.state';
import { UsersEffects } from './components/users-page.component/users-page-state/users-page-state.effects';
import { UsersReducer } from './components/users-page.component/users-page-state/users-page-state.reducer';
import { featureKeyUsersState } from './components/users-page.component/users-page-state/users-page-state.state';
import { GlobalErrorHandler } from './error-handlers/global-error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTooltipModule,
    ToastModule,
    MessageModule,
    BrowserAnimationsModule,
    TooltipModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),

    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature(featureKeyAccountState, AccountReducer),
    StoreModule.forFeature(featureKeyUserState, UserReducer),
    StoreModule.forFeature(featureKeyUsersState, UsersReducer),
    StoreModule.forFeature(featureKeyJobOffersState, JobOfferReducer),
    StoreModule.forFeature(featureKeyReportsState, ReportsReducer),
    StoreModule.forFeature(featureKeyBugsState, BugsReducer),
    StoreModule.forFeature(featureKeyCompaniesState, CompaniesReducer),
    StoreModule.forFeature(featureKeyStatsState, StatsReducer),

    EffectsModule.forRoot([
      AccountEffects,
      UserEffects,
      UsersEffects,
      JobOffersEffects,
      ReportsEffects,
      BugsEffects,
      CompaniesEffects,
      StatsEffects
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideCharts(withDefaultRegisterables()),
    provideAnimations(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
