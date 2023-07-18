import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


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
  // categories: any[] = [];
  categories: MatTableDataSource<Category> | any;
  dialogRef: MatDialogRef<CategoryDialogComponent> | undefined;

  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private dialog: MatDialog, 
              private router: Router, 
              private http: HttpClient, 
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getCategoriesPaginated();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getCategoriesPaginated();
  }

  setCategoriesArray(response: any) {
    this.categories = new MatTableDataSource<Category>(response.content);
    this.totalElements = response.totalElements;
  }
  

  public getCategoriesPaginated(): void {
    let page = this.currentPage;
    let size = this.pageSize;
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    
    this.http.get<any[]>(this.baseUrl + '/paginated', { params }).subscribe(
      (response) => {
        this.setCategoriesArray(response);
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

      this.getCategoriesPaginated();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();
  }
  
}
