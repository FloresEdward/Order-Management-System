import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


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

  private baseUrl = 'http://localhost:8080/api/v1/management/category';
  cardTitle: string = 'Manage Category';
  categories: any[] = [];
  dialogRef: MatDialogRef<CategoryDialogComponent> | undefined;

  constructor(private dialog: MatDialog, 
              private router: Router, 
              private http: HttpClient, 
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.http.get<any[]>(this.baseUrl + '/').subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  openCategoryDialog(action: string, category: any): void {
    let dialogData = {
      action: action,
      category: category
    }

    this.dialogRef = this.dialog.open(CategoryDialogComponent, { data: dialogData });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getCategories();
    });
  }
}
