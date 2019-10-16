import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

  private get _URI() {
    return `${this.appConfiSrv.APIServer}/morejee/products`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {

  }//constructor

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Product[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<Product>(`${this._URI}/${id}`);
  }//getById

  post(entity: Product) {
    return this.httpClient.post<Product>(this._URI, entity, { headers: this._header });
  }//post

  patch(entity: Product) {
    let hdr = new HttpHeaders({
      'Content-Type': 'application/json-patch+json'
    });
    return this.httpClient.patch(`${this._URI}/${entity.id}`, Product.genBasicPatchDoc(entity), { headers: hdr });
  }//patch

  batchDelete(ids: string) {
    return this.httpClient.post(`${this._URI}/batchDelete`, { ids: ids });
  }//batchDelete
}
