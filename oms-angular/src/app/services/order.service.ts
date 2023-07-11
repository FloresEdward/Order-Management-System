import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/api/v1/management/order'
  constructor(private http: HttpClient) { }

  public addOrder(addOrderRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/`;

    return this.http.post(url, addOrderRequest);
  }
}
