import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SimpleViewerTableColumn } from '@app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductPermissionGroupService, ProductPermissionGroup } from '@app/feature/morejee-ms';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProductpermissiongroupDetailComponent } from '../productpermissiongroup-detail/productpermissiongroup-detail.component';
import { MessageCenterService } from '@app/core';
import { ProductSelectDialogComponent } from '@app/feature/morejee-aux';
import { OrganizationSelectDialogComponent } from '@app/feature/basic-aux';

@Component({
  selector: 'morejee-productpermissiongroup',
  templateUrl: './productpermissiongroup.component.html',
  styleUrls: ['./productpermissiongroup.component.scss']
})
export class ProductpermissiongroupComponent implements OnInit, OnDestroy {


  _selectedGroudIds: string;
  _selectedOrganIds: string;
  _selectedProductIds: string;
  _groupKeyWord: string;
  _organKeyWord: string;
  _productKeyWord: string;
  _currentGroup: ProductPermissionGroup;
  get currentGroupId() {
    if (!this._currentGroup)
      return;
    return this._currentGroup.id;
  }
  get currentGroupName() {
    if (!this._currentGroup)
      return;
    return this._currentGroup.name;
  }
  @ViewChild('permissionGroupSearchCt',{static:true}) permissionGroupSearchCt: ElementRef;
  productPermissionGroups: ProductPermissionGroup[] = [];
  groupOrganizationItems: { id: string, name: string, description: string }[];
  groupProductItems: { id: string, name: string, description: string, categoryId: string, categoryName: string }[];
  permissionColDefs: SimpleViewerTableColumn[] = [
    {
      name: 'form.name',
      field: 'name'
    }
    , {
      name: 'form.description',
      field: 'description'
    }
  ];
  organColDefs: SimpleViewerTableColumn[] = [
    {
      name: 'form.name',
      field: 'name'
    }
    , {
      name: 'form.description',
      field: 'description'
    }
  ];
  productColDefs: SimpleViewerTableColumn[] = [
    {
      name: 'form.name',
      field: 'name'
    }
    , { name: 'form.category', field: 'categoryName', sortField: 'categoryId', width: 180 }
    , {
      name: 'form.description',
      field: 'description'
    }
  ];
  destroy$ = new Subject();
  constructor(private router: Router, private acr: ActivatedRoute, private groupSrv: ProductPermissionGroupService, private dialogSrv: MatDialog, private msgSrv: MessageCenterService) {

  }//constructor

  ngOnInit() {

    //初始化产品权限组列表
    this.queryPermissionGroup();
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  queryPermissionGroup() {
    this.groupSrv.query({ pageSize: 9999, search: this._groupKeyWord ? this._groupKeyWord : '' }).pipe(map(res => res.data ? res.data : [])).subscribe(datas => this.productPermissionGroups = datas);
  }//queryPermission

  onEditPermissionGroup(data?: any) {
    let ins = this.dialogSrv.open(ProductpermissiongroupDetailComponent, { width: '450px', height: '350px', data: { group: data ? data : null } });
    ins.componentInstance.afterSave.subscribe(() => this.queryPermissionGroup());
  }//onEditPermissionGroup

  onViewPermissionGroup(data: any) {
    this._currentGroup = data;
    // this.onRefreshOrganization();
    this.onSearchOrganization();
    this.onSearchProduct();
  }//onViewPermissionGroup

  onSelectPermissionGroup(datas: any[]) {
    if (datas && datas.length > 0) {
      let idArr = datas.map(x => x.id);
      this._selectedGroudIds = idArr.join(',');
    }
    else {
      this._selectedGroudIds = undefined;
    }
  }//onSelectPermissionGroup

  onDeletePermissionGroup() {
    if (!this._selectedGroudIds) return;
    this.groupSrv.batchDelete(this._selectedGroudIds).subscribe(() => {
      this.queryPermissionGroup();
      this.msgSrv.saveSuccessfully();
    });
  }//onDeletePermissionGroup

  onAddOrganization() {
    let ins = this.dialogSrv.open(OrganizationSelectDialogComponent, { width: '700px', height: "600px", disableClose: true });
    ins.componentInstance.afterSelect.pipe(switchMap(ids => this.groupSrv.addOwnOrganization(this.currentGroupId, ids))).subscribe(() => {
      this.onSearchOrganization();
      this.msgSrv.saveSuccessfully();
    });
  }//onAddOrganization

  onSelectOrganization(datas: any[]) {
    if (datas && datas.length > 0) {
      let idArr = datas.map(x => x.id);
      this._selectedOrganIds = idArr.join(',');
    }
    else {
      this._selectedOrganIds = undefined;
    }
  }//onSelectOrganization

  onDeleteOrganization() {
    if (!this._selectedOrganIds) return;
    this.groupSrv.deleteOwnOrganization(this.currentGroupId, this._selectedOrganIds).subscribe(() => {
      this.onSearchOrganization();
      this.msgSrv.saveSuccessfully();
    });
  }//onDeleteOrganization

  onSearchOrganization() {
    this.groupSrv.getOwnOrganization(this.currentGroupId, this._organKeyWord).subscribe(datas => {
      this.groupOrganizationItems = datas;
    });
  }//onSearchOrganization

  onSearchProduct() {
    this.groupSrv.getOwnProduct(this.currentGroupId, this._productKeyWord).subscribe(datas => {
      this.groupProductItems = datas;
    });
  }//onSearchProduct

  onAddProduct() {
    let ins = this.dialogSrv.open(ProductSelectDialogComponent, { width: '700px', height: "600px", disableClose: true });
    ins.componentInstance.afterSelect.pipe(switchMap(ids => this.groupSrv.addOwnProduct(this.currentGroupId, ids))).subscribe(() => {
      this.onSearchProduct();
      this.msgSrv.saveSuccessfully();
    });
  }//onAddProduct

  onSelectProduct(datas: any[]) {
    if (datas && datas.length > 0) {
      let idArr = datas.map(x => x.id);
      this._selectedProductIds = idArr.join(',');
    }
    else {
      this._selectedProductIds = undefined;
    }
  }//onSelectProduct

  onDeleteProduct() {
    if (!this._selectedProductIds) return;
    this.groupSrv.deleteOwnProduct(this.currentGroupId, this._selectedProductIds).subscribe(() => {
      this.onSearchProduct();
      this.msgSrv.saveSuccessfully();
    });
  }//onDeleteProduct

}
