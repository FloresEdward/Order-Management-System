import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';


interface Category {
  name: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
// export class CategoryComponent {
export class CategoryComponent implements OnInit {

  cardTitle: string = 'Manage Category'; //title for card

  categories: any[] = [
    { name: 'Category 1' },
    { name: 'Category 2' },
    { name: 'Category 3' }
  ];


  dialogRef: MatDialogRef<CategoryDialogComponent> | undefined;

  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {

  }

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


  openCategoryDialog(action: string, category: any): void {
    let dialogData = {
      action: action,
      category: category
    }

    this.dialogRef = this.dialog.open(CategoryDialogComponent, { data: dialogData });
    this.dialogRef.afterClosed().subscribe(result => {
      // Handle the result here (e.g., perform an action based on the result)
      console.log(result);
    });
  }
}
