import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8080/api/v1/management/customer'
  constructor(private http: HttpClient) { }

  public addCustomer(addCustomerRequest: any) : Observable<any> {
    const url = `${this.baseUrl}/`;

    return this.http.post(url, addCustomerRequest);
  }
}
