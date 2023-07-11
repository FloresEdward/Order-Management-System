import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/v1/management/menu';

  constructor(private http: HttpClient) { }

  public addProduct(addProductRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/`;

    return this.http.post(url, addProductRequest);
  }

  public editProduct(editProductRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/`;

    return this.http.put(url, editProductRequest);
  }

  public deleteProduct(deleteProductRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/delete/${deleteProductRequest.id}`;

    return this.http.post(url, deleteProductRequest);
  }
}
