import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  private get _URI() {
    return `${this.configSrv.APIServer}/oms/orders`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected configSrv: AppConfigService) {
  }//constructor


  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Order[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<Order>(`${this._URI}/${id}`);
  }//get

  updateCustomer(orderId: string, customer: any) {
    return this.httpClient.post(`${this._URI}/${orderId}/Customer`, customer, { headers: this._header });
  }//updateCustomer
}
