import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { MaterialModule } from './shared/material-module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './landing/login/login.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { AuthenticationService } from './services/authentication.service';
import { SignupComponent } from './landing/signup/signup.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ForgotPasswordComponent } from './landing/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/auth-guard.service';
import { ResetFormComponent } from './landing/forgot-password/reset-form/reset-form.component';
import { ResetSuccessComponent } from './landing/forgot-password/reset-success/reset-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeSuccessComponent } from './change-success/change-success.component';
// import { OrderHistoryComponent } from './order/order-history/order-history.component';




@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetFormComponent,
    ResetSuccessComponent,
    ChangePasswordComponent,
    ChangeSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
