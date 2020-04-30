import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '@interfaces/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'https://reqres.in/api/';
  private readonly appRunningOnMobile = new BehaviorSubject<boolean>(null);
  constructor(private readonly httpClient: HttpClient) {}

  get customerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseUrl}users?page=2`);
  }

  setApplicationPlatform(status): void {
    this.appRunningOnMobile.next(status);
  }

  get isCordovaAvailable(): Observable<boolean> {
    return this.appRunningOnMobile;
  }
}
