import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { Material } from '../models/material';
import { PatchOperation } from '@app/feature/base-ms';

@Injectable()
export class MaterialService {

  private get _URI() {
    return `${this.appConfiSrv.APIServer}/morejee/materials`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {
  }//constructor

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Material[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<Material>(`${this._URI}/${id}`);
  }//getById

  post(entity: Material) {
    return this.httpClient.post<Material>(this._URI, entity, { headers: this._header });
  }//post

  patch(id: string, doc: PatchOperation[]) {
    return this.httpClient.patch(`${this._URI}/${id}`, doc, { headers: PatchOperation.PatchContentType });
  }//patch

  batchDelete(ids: string) {
    return this.httpClient.post(`${this._URI}/batchDelete`, { ids: ids });
  }//batchDelete
}
