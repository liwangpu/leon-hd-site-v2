import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { Solution } from '../models/solution';
import { PatchOperation } from '@app/feature/base-ms';

@Injectable()
export class SolutionService {

  private get _URI() {
    return `${this.configSrv.APIServer}/morejee/solutions`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected configSrv: AppConfigService) {
  }//constructor


  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Solution[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<Solution>(`${this._URI}/${id}`);
  }//getById

  patch(id: string, doc: PatchOperation[]) {
    return this.httpClient.patch(`${this._URI}/${id}`, doc, { headers: PatchOperation.PatchContentType });
  }//patch
  
  batchDelete(ids: string) {
    return this.httpClient.post(`${this._URI}/batchDelete`, { ids: ids });
  }//batchDelete
}
