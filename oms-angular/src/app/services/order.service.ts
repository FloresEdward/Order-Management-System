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

  public setOrderStatusCancel(editOrderRequest: any): Observable<any> {
    const url = `${this.baseUrl}/cancel/${editOrderRequest.orderId}`;

    return this.http.post(url, editOrderRequest);
  }

  public setOrderStatusFulfilled(editOrderRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/fulfill`;

    return this.http.post(url, editOrderRequest);
  }
  
  public getAllOrders(editOrderRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/getAll`;

    return this.http.post(url, editOrderRequest);
  }

  public getActiveOrders(editOrderRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/getActive`;

    return this.http.post(url, editOrderRequest);
  }

  public setOrderStatusCancelled(editOrderRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/cancel`;

    return this.http.post(url, editOrderRequest);
  }

  public updateCourierName(editOrderRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/${editOrderRequest.orderId}/courier/${editOrderRequest.courierName}`;

    return this.http.post(url, editOrderRequest);
  }
}
