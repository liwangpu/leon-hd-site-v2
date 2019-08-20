import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { takeUntil, debounceTime, filter, take, map } from 'rxjs/operators';
import { ListViewerTableColumn } from '../../models/list-viewer-table-column';
import { ListViewerOpsatService } from '../../services/list-viewer-opsat.service';
import { ListViewerTopicEnum } from '../../enums/list-viewer-topic-enum';
import { Sort } from '@angular/material/sort';
import { LargeIconViewerComponent } from '../large-icon-viewer/large-icon-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { ServerRedirectPipe } from '../../pipes/server-redirect.pipe';

class ListViewerTableDataSource implements DataSource<any>{

  _dataSubject = new BehaviorSubject<any[]>([]);
  connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
    return this._dataSubject.asObservable();
  }//connect

  disconnect(collectionViewer: CollectionViewer): void {
    this._dataSubject.complete();
    this._dataSubject.unsubscribe();
  }//disconnect

  refreshData(datas: any[]) {
    this._dataSubject.next(datas);
  }//refreshData

}//ListViewerTableDataSource

@Component({
  selector: 'shared-list-viewer-table',
  templateUrl: './list-viewer-table.component.html',
  styleUrls: ['./list-viewer-table.component.scss']
})
export class ListViewerTableComponent implements OnInit, OnDestroy {

  _hasIconColumnDef = false;
  _nameColumnDef: ListViewerTableColumn;
  selection = new SelectionModel<any>(true, []);
  columnsToDisplay: string[] = [];
  columnDefs: ListViewerTableColumn[] = [];
  dataSource = new ListViewerTableDataSource();
  destroy$ = new Subject<boolean>();
  constructor(protected opsatSrv: ListViewerOpsatService, private dialogSrv: MatDialog, protected redirectPipe: ServerRedirectPipe) {

    //订阅列表column定义改变事件,只订阅一次即可
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.columnDefineChange)).pipe(take(1)).subscribe(tp => {
      this.columnDefs = tp.data;
      this._nameColumnDef = this.columnDefs.filter(x => x.field == "name")[0];
      this.columnDefs.unshift({ name: '_select', field: '_select' });
      this.columnDefs.unshift({ name: '_seqno', field: '_seqno' });
      this.columnsToDisplay = this.columnDefs.map(x => x.field);
      this._hasIconColumnDef = this.columnDefs.some(x => x.field == "icon");
    });//subscribe
    //订阅列表数据改变事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.listDataChange)).pipe(map(tp => tp.data)).subscribe(result => {
      this.selection.clear();
      this.dataSource.refreshData(result.data);
    });//subscribe
    //订阅获取选中项目事件
    // this.opsatSrv.message.pipe(filter(tp=>tp.topic==ListViewerTopicEnum._getSelectItems))





    this.opsatSrv.publish(ListViewerTopicEnum.requestColumnDefine);
    // console.log('table init');
  }//constructor

  ngOnInit() {
    this.selection.changed.pipe(debounceTime(150)).pipe(takeUntil(this.destroy$)).subscribe(res => {
      // console.log('selected change:', res.source.selected);
      this.opsatSrv.publish(ListViewerTopicEnum.dataSelectedChange, res.source.selected);
    });//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    // this.selection.changed
    // console.log('listviewer table destroy');
  }//ngOnDestroy

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource._dataSubject.getValue().length;
    return numSelected === numRows;
  }//isAllSelected

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
      this.dataSource._dataSubject.getValue().forEach(row => this.selection.select(row));
  }//masterToggle

  onSortData(sort: Sort) {
    let it = this.columnDefs.filter(x => x.field == sort.active)[0];
    let field = it.sortField ? it.sortField : it.field;
    this.opsatSrv.publish(ListViewerTopicEnum.sortData, { field: field, direction: sort.direction });
  }//onSortData

  viewRecord(data: any) {
    // this.opsatSrv.message.next({ topic: ListViewerTopicEnum.viewDetail, data: data });
    this.opsatSrv.publish(ListViewerTopicEnum.viewRecord, data);
  }//viewRecord

  viewLargeIcon(url: string) {
    if (!url) return;;
    url = this.redirectPipe.transform(url);
    this.dialogSrv.open(LargeIconViewerComponent, { width: '500px', height: '500px', data: { url: url } });
  }//viewLargeIcon

}
