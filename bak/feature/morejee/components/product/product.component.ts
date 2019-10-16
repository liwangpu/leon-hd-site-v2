import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn, ListViewerTopicEnum } from '@app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService, ProductService, Category } from '@app/feature/morejee-ms';
import { Observable, of } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { take, concatMap, filter, map } from 'rxjs/operators';
import { MessageCenterService } from '@app/core';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { PointKeyEnum } from '@app/feature/basic-ms';

@Component({
  selector: 'morejee-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class ProductComponent extends ListViewerLauncher implements OnInit, AfterViewInit {

  private _categoryId: string;
  private _unClassified: boolean;
  private _searchForm: any;
  private _pointKeys: string[];
  selectedCategory: string;
  category: Category;
  constructor(protected opsat: ListViewerOpsatService, protected productSrv: ProductService, protected catSrv: CategoryService, protected router: Router, protected acr: ActivatedRoute, protected dialogSrv: MatDialog, protected mediaObserver: MediaObserver, protected msgSrv: MessageCenterService) {
    super(opsat);
    this._pointKeys = this.acr.snapshot.data['pointKeys'] ? this.acr.snapshot.data['pointKeys'] : [];
  }//constructor

  ngOnInit() {
    this.catSrv.getTreeByResource('product').pipe(concatMap(cat => this.catSrv.addUnCategoryNode(cat))).subscribe(cat => this.category = cat);
    this.opsat.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._initExtQueryParam), map(tp => tp.data), take(1)).subscribe(prm => {
      this.selectedCategory = prm['categoryId'];
    });
    this.opsat.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._cancelAllSearch)).subscribe(() => this.selectedCategory = undefined);
  }//ngOnInit

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mediaObserver.media$.pipe(take(1)).subscribe((change: MediaChange) => {
        let minMode = change.mqAlias == 'sm' || change.mqAlias == 'xs' ? true : false;
        if (!minMode)
          this.openListDrawer();
      });
    }, 300);
  }//ngAfterViewInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {

    let defs = [
      { name: 'form.icon', field: 'icon' }
      , { name: 'form.name', field: 'name' }
      , { name: 'form.category', field: 'categoryName', sortField: 'categoryId', width: 180 }
      , { name: 'form.price', field: 'price', width: 100 }
      , { name: 'form.partnerPrice', field: 'partnerPrice', width: 100 }
      , { name: 'form.purchasePrice', field: 'purchasePrice', width: 100 }
      , { name: 'form.brand', field: 'brand', width: 100 }
      , { name: 'form.unit', field: 'unit', width: 60 }
      , { name: 'form.description', field: 'description' }
    ];

    if (!this._pointKeys.some(k => k == PointKeyEnum.PriceRetrieve))
      defs[3] = undefined;
    if (!this._pointKeys.some(k => k == PointKeyEnum.PartnerPriceRetrieve))
      defs[4] = undefined;
    if (!this._pointKeys.some(k => k == PointKeyEnum.PurchasePriceRetrieve))
      defs[5] = undefined;
      
    return of(defs.filter(x => x));
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number; data: any[]; }> {
    return this.productSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    this.router.navigate(['./detail'], { relativeTo: this.acr });
  }//onAddRecord

  onFilterRecords(param: object): void {
    let ins = this.dialogSrv.open(ProductFilterComponent, { width: '700px', height: '550px', disableClose: true, data: param });
    ins.componentInstance.search.subscribe(form => {
      this._searchForm = form;
      this.gotoAdvanceSearch();
    });
    ins.componentInstance.clearSearch.subscribe(() => this.clearAdvanceSearch());
  }//onFilterRecords

  onDeleteRecords(datas: any[]): void {
    let idArr = datas.map(x => x.id);
    this.productSrv.batchDelete(idArr.join(',')).subscribe(() => {
      this.msgSrv.saveSuccessfully();
      this.refreshRecords();
    });
  }//onDeleteRecords

  onCategorySelect(cat: Category) {

    this._unClassified = false;
    if (cat.lValue == 1) {
      this._categoryId = "";
    }
    else if (cat.lValue == -1) {
      this._categoryId = "UnClassified";
      this._unClassified = true;
    }
    else {
      this._categoryId = cat.id;
    }

    this.gotoAdvanceSearch();
  }//onCategorySelect

  clearAdvanceSearch() {
    this._categoryId = "";
    this._unClassified = false;
    this._searchForm = null;
    this.opsat.publish(ListViewerTopicEnum._cancelAllSearch);
  }//clearAdvanceSearch

  gotoAdvanceSearch() {
    let prm = this._searchForm ? this._searchForm : {};
    if (this._categoryId)
      prm["categoryId"] = this._categoryId;
    if (this._unClassified)
      prm["unClassified"] = true;
    this.advanceSearch(prm);
  }//gotoAdvanceSearch

}
