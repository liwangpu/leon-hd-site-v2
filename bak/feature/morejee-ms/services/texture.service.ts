import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { Texture } from '../models/texture';

@Injectable()
export class TextureService {

  private get _URI() {
    return `${this.configSrv.APIServer}/morejee/textures`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected configSrv: AppConfigService) {
  }//constructor


  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Texture[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<Texture>(`${this._URI}/${id}`);
  }//getById

  batchDelete(ids: string) {
    return this.httpClient.post(`${this._URI}/batchDelete`, { ids: ids });
  }//batchDelete

}
