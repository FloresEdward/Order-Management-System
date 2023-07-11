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
              }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addCategory() {
    console.log("Added category");
    const categoryDetails = {
      name: this.categoryName
    }

    this.categoryService.addCategory(categoryDetails).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    );
  }

  editCategory() {
    console.log("Editted category");
  }

  deleteCategory() {
    console.log("Deleted category");
  }
}
