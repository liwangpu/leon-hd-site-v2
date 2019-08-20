import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {

  private get _URI() {
    return `${this.configSrv.APIServer}/oms/customers`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected configSrv: AppConfigService) {
  }//constructor


  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Customer[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<Customer>(`${this._URI}/${id}`);
  }//get

  post(entity: Customer) {
    return this.httpClient.post<Customer>(this._URI, entity, { headers: this._header });
  }//post


}
