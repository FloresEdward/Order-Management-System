import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MaterialModule } from '../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routing';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { InfoDialogComponent } from './user-dialog/info-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(UsersRoutes),
    SharedModule,
    MatTableModule
  ],
  declarations: [UsersComponent, UserDialogComponent, InfoDialogComponent]
})
export class UsersModule { }
