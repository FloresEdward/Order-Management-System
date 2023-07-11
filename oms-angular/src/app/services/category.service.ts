import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/v1/management/category';

  constructor(private http: HttpClient) { }

  public addCategory(addCategoryRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/`;

    return this.http.post(url, addCategoryRequest);
  }
}
