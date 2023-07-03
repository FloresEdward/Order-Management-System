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
import { BestSellerComponent } from './landing/login.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthStateService } from './shared/auth-state.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    BestSellerComponent,
    HomeComponent,
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
    AuthService,
    AuthGuard,
    AuthStateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
