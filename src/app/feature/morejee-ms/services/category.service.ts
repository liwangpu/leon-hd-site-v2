import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/core';
import * as queryString from 'query-string';
import { Category } from '../models/category';
import { TranslateService } from '@ngx-translate/core';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  Uri: string;
  header: HttpHeaders;//默认为application/json的Content-Type Header
  constructor(protected httpClient: HttpClient, protected appConfiSrv: AppConfigService, protected translate: TranslateService) {
    this.Uri = `${this.appConfiSrv.APIServer}/morejee/categories`;
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }//constructor

  getById(id: string) {
    return this.httpClient.get<Category>(`${this.Uri}/${id}`);
  }//getById

  getTreeById(id: string, filteredId?: string) {
    return this.httpClient.get<Category>(`${this.Uri}/tree/${id}?filteredIds=${filteredId ? filteredId : ""}`);
  }//getTreeById

  getTreeByResource(resource: string) {
    return this.httpClient.get<Category>(`${this.Uri}/tree?resource=${resource}`);
  }//getTreeById

  query(queryParam: any) {
    let queryPart = queryString.stringify(queryParam);
    return this.httpClient.get<{ total: number, data: Category[] }>(`${this.Uri}?${queryPart}`);
  }//query

  post(entity: Category) {
    return this.httpClient.post<Category>(this.Uri, entity, { headers: this.header });
  }//post

  patch(entity: Category) {
    let hdr = new HttpHeaders({
      'Content-Type': 'application/json-patch+json'
    });
    return this.httpClient.patch(`${this.Uri}/${entity.id}`, Category.GenPatchDoc(entity), { headers: hdr });
  }//patch

  delete(id: string) {
    return this.httpClient.delete(`${this.Uri}/${id}`);
  }//delete

  moveUp(id: string) {
    return this.httpClient.patch(`${this.Uri}/moveup/${id}`, null);
  }//moveUp

  moveDown(id: string) {
    return this.httpClient.patch(`${this.Uri}/movedown/${id}`, null);
  }//moveDown

  changeHierarchy(currentCategoryId: string, parentId: string) {
    let data = {
      categoryId: currentCategoryId,
      parentId: parentId
    };
    return this.httpClient.post<Category>(`${this.Uri}/ChangeHierarchy`, data, { headers: this.header });
  }//changeHierarchy

  addUnCategoryNode(cat: Category) {
    return this.translate.get("glossary.unClassified").pipe(tap(msg => {
      let unCatNode = new Category();
      unCatNode.id = 'UnClassified';
      unCatNode.name = msg;
      unCatNode.lValue = -1;
      unCatNode.rValue = -2;
      cat.children.unshift(unCatNode);
    }), map(() => cat));
  }//addUnCategoryNode

}
