import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn, ListViewerTopicEnum } from '@app/shared';
import { MaterialService, CategoryService, Category } from '@app/feature/morejee-ms';
import { Observable, of } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { take, filter, map, concatMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'morejee-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class MaterialComponent extends ListViewerLauncher implements OnInit, AfterViewInit {

  selectedCategory: string;
  category: Category;
  constructor(protected opsat: ListViewerOpsatService, protected materialSrv: MaterialService, protected mediaObserver: MediaObserver, protected catSrv: CategoryService, protected router: Router, protected acr: ActivatedRoute, protected msgSrv: MessageCenterService) {
    super(opsat);
  }//constructor

  ngOnInit() {
    this.catSrv.getTreeByResource('material').pipe(concatMap(cat => this.catSrv.addUnCategoryNode(cat))).subscribe(cat => this.category = cat);
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
    return of([
      { name: 'form.icon', field: 'icon' }
      , { name: 'form.name', field: 'name' }
      , { name: 'form.category', field: 'categoryName', sortField: 'categoryId' }
      , { name: 'form.description', field: 'description' }
    ]);
  }//getColumnDefines

  onQuery(queryParam: any): Observable<{ total: number; data: any[]; }> {
    return this.materialSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    throw new Error("Method not implemented.");
  }
  onFilterRecords(param: object): void {
    throw new Error("Method not implemented.");
  }

  onDeleteRecords(datas: any[]): void {
    let idArr = datas.map(x => x.id);
    this.materialSrv.batchDelete(idArr.join(',')).subscribe(() => {
      this.msgSrv.saveSuccessfully();
      this.refreshRecords();
    });
  }//onDeleteRecords

  onCategorySelect(cat: Category) {
    // console.log(111, cat);
    if (cat.lValue == 1)
      this.advanceSearch({ categoryId: '' });
    else if (cat.lValue == -1)
      this.advanceSearch({ categoryId: 'UnClassified', unClassified: true });
    else
      this.advanceSearch({ categoryId: cat.id });
  }//onCategorySelect

}
