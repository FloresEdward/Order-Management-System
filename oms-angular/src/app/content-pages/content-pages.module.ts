import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material-module';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ContentPagesRoutingModule
  ],
  declarations: [
    Error404Component,
    LoginComponent,
    HomeComponent
  ],
})
export class ContentPagesModule { }
