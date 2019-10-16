import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import { AccessPoint } from '../models/access-point';
import * as queryString from 'query-string';
import { PatchOperation } from '@app/feature/base-ms';

@Injectable()
export class AccessPointService {

  private get _URI() {
    return `${this.appConfiSrv.APIServer}/Basic/AccessPoints`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {
  }//constructor

  getById(id: string) {
    return this.httpClient.get<AccessPoint>(`${this._URI}/${id}`);
  }//get

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: AccessPoint[] }>(`${this._URI}?${queryPart}`);
  }//query

  post(entity: AccessPoint) {
    return this.httpClient.post<AccessPoint>(this._URI, entity, { headers: this._header });
  }

  patch(id: string, opts: PatchOperation[]) {
    return this.httpClient.patch(`${this._URI}/${id}`, opts, { headers: PatchOperation.PatchContentType });
  }//patch
}
