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
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthStateService } from './shared/auth-state.service';
import { HttpClientModule } from '@angular/common/http';
import { FullPagesModule } from './full-pages/full-pages.module';
import { ContentPagesModule } from './content-pages/content-pages.module';



@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent
  ],
  imports: [
    FullPagesModule,
    ContentPagesModule,
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
