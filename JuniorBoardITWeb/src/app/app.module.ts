import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AccountEffects } from './components/account-page.component/account-page-state/account-page-state.effects';
import { featureKeyAccountState } from './components/account-page.component/account-page-state/account-page-state.state';
import { AccountReducer } from './components/account-page.component/account-page-state/account-page-state.reducer';
import { RegisterComponent } from './components/account-page.component/register-page.component/register-page.component';
import { LoginComponent } from './components/account-page.component/login-page.component/login-page.component';
import { featureKeyUserState } from './components/user-page.component/user-page-state/user-page-state.state';
import { UserReducer } from './components/user-page.component/user-page-state/user-page-state.reducer';
import { UserEffects } from './components/user-page.component/user-page-state/user-page-state.effects';
import { UserPageComponent } from './components/user-page.component/user-page.component';
import { UsersPageComponent } from './components/users-page.component/users-page.component';
import { UsersReducer } from './components/users-page.component/users-page-state/users-page-state.reducer';
import { featureKeyUsersState } from './components/users-page.component/users-page-state/users-page-state.state';
import { UsersEffects } from './components/users-page.component/users-page-state/users-page-state.effects';
import { GlobalErrorHandler } from './error-handlers/global-error-handler';
import { UIErrorHandler } from './error-handlers/ui-error-handler/ui-error-handler.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './components/shared/paginator.component/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserPageComponent,
    UsersPageComponent,
    UIErrorHandler,
    PaginatorComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    
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

    EffectsModule.forRoot([AccountEffects, UserEffects, UsersEffects]),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
export function httpTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}