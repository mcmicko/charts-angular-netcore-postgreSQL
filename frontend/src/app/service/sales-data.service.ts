import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SalesDataService {
  constructor(private _http: Http) {}

  getOrders(pageIndex: number, pageSize: number) {
    return this._http
      .get('http://localhost:5000/api/order/' + pageIndex + '/' + pageSize)
      .pipe(map((res) => res.json()));
  }

  getOrdersByCustomer(n: number) {
    return this._http
      .get('http://localhost:5000/api/order/bycustomer/' + n)
      .pipe(map((res) => res.json()));
  }

  getOrdersByState() {
    return this._http
      .get('http://localhost:5000/api/order/bystate/')
      .pipe(map((res) => res.json()));
  }
}
