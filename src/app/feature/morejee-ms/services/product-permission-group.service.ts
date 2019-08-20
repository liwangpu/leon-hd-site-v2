import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { ProductPermissionGroup } from '../models/product-permission-group';
import { PatchOperation } from '@app/feature/base-ms';

@Injectable()
export class ProductPermissionGroupService {

  private get _URI() {
    return `${this.configSrv.APIServer}/Morejee/ProductPermissionGroups`;
  }
  private get _header() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  constructor(protected httpClient: HttpClient, protected configSrv: AppConfigService) {
  }//constructor

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: ProductPermissionGroup[] }>(`${this._URI}?${queryPart}`);
  }//query

  getById(id: string) {
    return this.httpClient.get<ProductPermissionGroup>(`${this._URI}/${id}`);
  }//getById

  post(entity: ProductPermissionGroup) {
    return this.httpClient.post<ProductPermissionGroup>(this._URI, entity, { headers: this._header });
  }//post

  patch(id: string, doc: PatchOperation[]) {
    return this.httpClient.patch(`${this._URI}/${id}`, doc, { headers: PatchOperation.PatchContentType });
  }//patch

  batchDelete(ids: string) {
    return this.httpClient.post(`${this._URI}/batchDelete`, { ids: ids });
  }//batchDelete

  addOwnOrganization(groupId: string, organIds: string) {
    return this.httpClient.post(`${this._URI}/${groupId}/Organization`, { organizationIds: organIds });
  }//addOwnOrganization

  getOwnOrganization(groupId: string, search?: string) {
    return this.httpClient.get<{ id: string, name: string, description: string }[]>(`${this._URI}/${groupId}/Organization?search=${search ? search : ''}`);
  }//getOwnOrganization

  deleteOwnOrganization(groupId: string, ids: string) {
    return this.httpClient.post(`${this._URI}/${groupId}/Organization/BatchDelete`, { ids: ids });
  }//deleteOwnOrganization

  addOwnProduct(groupId: string, productIds: string) {
    return this.httpClient.post(`${this._URI}/${groupId}/Product`, { productIds: productIds });
  }//addOwnOrganization

  getOwnProduct(groupId: string, search?: string, categoryId?: string) {
    return this.httpClient.get<{ id: string, name: string, description: string, categoryId: string, categoryName: string }[]>(`${this._URI}/${groupId}/Product?search=${search ? search : ''}&categoryId=${categoryId ? categoryId : ''}`);
  }//getOwnOrganization

  deleteOwnProduct(groupId: string, ids: string) {
    return this.httpClient.post(`${this._URI}/${groupId}/Product/BatchDelete`, { ids: ids });
  }//deleteOwnProduct

  getOrganizationAllPermissionProduct(organId: string, search?: string) {
    return this.httpClient.get<{ id: string, name: string, description: string, categoryId: string, categoryName: string, groupName: string }[]>(`${this._URI}/Product?organizationId=${organId}&search=${search ? search : ''}`);
  }//getOrganizationAllPermissionProduct

}
