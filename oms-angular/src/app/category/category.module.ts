import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { MaterialModule } from '../shared/material-module';
import { AddCategoryDialogComponent } from './dialogs/add-category-dialog/add-category-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(CategoryRoutes),
    FormsModule,
  ],
  declarations: [CategoryComponent, AddCategoryDialogComponent],
})
export class CategoryModule { }
