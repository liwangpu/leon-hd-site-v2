import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';
import { OrganizationType } from '../models/organization-type';
import { AppConfigService } from '@app/core';

@Injectable()
export class OrganizationTypeService {

  Uri: string;
  header: HttpHeaders;//默认为application/json的Content-Type Header
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService) {
    this.Uri = `${this.appConfiSrv.APIServer}/basic/organizationTypes`;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }//constructor

  query(queryParam?: any) {
    if (!queryParam)
      queryParam = { page: 1, pageSize: 100 };
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: OrganizationType[] }>(`${this.Uri}?${queryPart}`);
  }//query

}
