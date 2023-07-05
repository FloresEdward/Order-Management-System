import { Component } from '@angular/core';
import { AddCategoryDialogComponent } from './dialogs/add-category-dialog/add-category-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


interface Category {
  name: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  cardTitle: string = 'Manage Category'; //title for card

  categories: any[] = [
    { name: 'Category 1' },
    { name: 'Category 2' },
    { name: 'Category 3' }
  ];

  
  dialogRef: MatDialogRef<AddCategoryDialogComponent> | undefined;

  constructor(private dialog: MatDialog) {}

  // Function to add a new category
  addCategory() {
    // Add your logic here to handle adding a category
  }

  // Function to edit a category
  editCategory(category: any) {
    // Add your logic here to handle editing a category
  }

  // Function to delete a category
  deleteCategory(category: any) {
    // Add your logic here to handle deleting a category
  }


  openAddCategoryDialog(): void {
    this.dialogRef = this.dialog.open(AddCategoryDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      // Handle the result here (e.g., perform an action based on the result)
      console.log(result);
    });
  }
}
