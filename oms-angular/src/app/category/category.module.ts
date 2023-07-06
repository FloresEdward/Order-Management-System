import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { MaterialModule } from '../shared/material-module';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(CategoryRoutes),
    FormsModule,
    SharedModule
  ],
  declarations: [CategoryComponent, CategoryDialogComponent],
})
export class CategoryModule { }
