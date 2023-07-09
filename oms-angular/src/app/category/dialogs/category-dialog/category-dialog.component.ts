import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  dialogTitle: string = "";
  action: string = "";
  categoryName: string = "";

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.action = data.action;
                this.categoryName = data.category ? data.category.name : '';
              }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addCategory() {
    console.log("Added category");
  }

  editCategory() {
    console.log("Editted category");
  }

  deleteCategory() {
    console.log("Deleted category");
  }
}
