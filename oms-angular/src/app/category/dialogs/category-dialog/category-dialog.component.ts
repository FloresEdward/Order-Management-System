import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  dialogTitle: string = "";
  action: string = "";
  categoryName: string = "";
  categoryId: string = ""

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.action = data.action;
    this.categoryName = data.category ? data.category.name : '';
    this.categoryId = data.category ? data.category.id : '';
  }

  closeDialog(): void {
    this.dialogRef.close({ success: false });
  }

  addCategory() {
    const categoryDetails = {
      name: this.categoryName
    }

    this.categoryService.addCategory(categoryDetails).subscribe(
      (response) => {
        console.log(response)
        this.dialogRef.close({ success: true });
      },
      (error) => {
        console.log(error)
      }
    );

    this.closeDialog();
  }

  editCategory() {
    const categoryDetails = {
      id: this.categoryId,
      name: this.categoryName
    }

    this.categoryService.editCategory(categoryDetails).subscribe(
      (response) => {
        console.log(response)
        this.dialogRef.close({ success: true });
      },
      (error) => {
        console.log(error)
      }
    );

    this.closeDialog();
  }

  deleteCategory() {
    const categoryDetails = {
      id: this.categoryId
    }

    this.categoryService.deleteCategory(categoryDetails).subscribe(
      (response) => {
        console.log(response)
        this.dialogRef.close({ success: true });
      },
      (error) => {
        console.log(error)
      }
    );

    this.closeDialog();
  }
}
