import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  dialogTitle: string = "";
  action: string = "";
  categoryName: string = "";
  categoryId: string = ""
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.action = data.action;
    this.categoryName = data.category ? data.category.name : '';
    this.categoryId = data.category ? data.category.id : '';

    this.categoryForm = this.formBuilder.group({
      name: [this.categoryName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]]
    });
  }

  ngOnInit() {

  }

  get name() {
    return this.categoryForm.get('name');
  }

  closeDialog(): void {
    this.dialogRef.close({ success: false });
  }

  handleSubmit(action: string){
    if (this.categoryForm.invalid) {
      return;
    }

    switch (this.action) {
      case 'Add':
        this.addCategory();
        break;
      case 'Edit':
        this.editCategory();
        break;
      default:
        break;
    }
  }

  addCategory() {
    if (this.categoryForm.valid) {
      const categoryDetails = {
        name: this.categoryForm.get('name')?.value
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
  }

  editCategory() {
    if (this.categoryForm.valid) {
      const categoryDetails = {
        id: this.categoryId,
        name: this.categoryForm.get('name')?.value
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

  }

  deleteCategory() {
    if (this.categoryForm.valid) {
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
}
