import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { Fileasset } from '../models/fileasset';

@Injectable()
export class FileassetService {

  private get _URI() {
    return `${this.configSrv.APIServer}/oss/files`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected configSrv: AppConfigService) {
  }//constructor


  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Fileasset[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<Fileasset>(`${this._URI}/${id}`);
  }//get

  post(entity: Fileasset) {
    return this.httpClient.post<Fileasset>(this._URI, entity, { headers: this._header });
  }

  patch(entity: Fileasset) {
    let hdr = new HttpHeaders({
      'Content-Type': 'application/json-patch+json'
    });
    return this.httpClient.patch(`${this._URI}/${entity.id}`, Fileasset.GenPatchDoc(entity), { headers: hdr });
  }//patch
}
