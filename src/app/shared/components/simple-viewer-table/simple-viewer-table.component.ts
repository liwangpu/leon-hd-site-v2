import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SimpleViewerTableColumn } from '../../models/simple-viewer-table-column';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { Sort } from '@angular/material/sort';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ServerRedirectPipe } from '../../pipes/server-redirect.pipe';
import { MatDialog } from '@angular/material/dialog';
import { LargeIconViewerComponent } from '../large-icon-viewer/large-icon-viewer.component';

class SimpleViewerTableDataSource implements DataSource<any>{

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

}//SimpleViewerTableDataSource

@Component({
  selector: 'shared-simple-viewer-table',
  templateUrl: './simple-viewer-table.component.html',
  styleUrls: ['./simple-viewer-table.component.scss']
})
export class SimpleViewerTableComponent implements OnInit, OnDestroy {

  private _columnDefs: SimpleViewerTableColumn[] = [];
  _hasIconColumnDef = false;
  _nameColumnDef: SimpleViewerTableColumn;
  columnsToDisplay: string[] = [];
  @Input() set columnDefs(val: SimpleViewerTableColumn[]) {
    if (!val || val.length < 1) return;
    this._columnDefs = val;
    this._columnDefs.unshift({ name: '_select', field: '_select' });
    this._columnDefs.unshift({ name: '_seqno', field: '_seqno' });
    this.columnsToDisplay = this.columnDefs.map(x => x.field);
    this._nameColumnDef = this.columnDefs.filter(x => x.field == "name")[0];
    this._hasIconColumnDef = this.columnDefs.some(x => x.field == "icon");
  }
  get columnDefs() {
    return this._columnDefs;
  }
  @Input() set datas(val: any[]) {
    val = val && val.length > 0 ? val : [];
    this._selection.clear();
    setTimeout(() => {
      this._dataSource.refreshData(val);
    }, 200);
  }
  @Input() useStaticSort: string;
  @Output() viewItem = new EventEmitter();
  @Output() sortItems = new EventEmitter();
  @Output() selectItems = new EventEmitter();
  _selection = new SelectionModel<any>(true, []);
  _dataSource = new SimpleViewerTableDataSource();
  _destroy$ = new Subject<boolean>();
  constructor(private dialogSrv: MatDialog, protected redirectPipe: ServerRedirectPipe) {

  }//constructor

  ngOnInit() {
    this._selection.changed.pipe(debounceTime(150)).pipe(takeUntil(this._destroy$)).subscribe(res => this.selectItems.next(res.source.selected));//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }//ngOnDestroy

  _compareValues(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      let varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      let varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
      //null会让排序失效,如果值是null的话,转为空字符
      if (typeof varA === 'object') varA = "";
      if (typeof varB === 'object') varB = "";

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      }
      else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  _isAllSelected() {
    const numSelected = this._selection.selected.length;
    const numRows = this._dataSource._dataSubject.getValue().length;
    return numSelected === numRows;
  }//_isAllSelected

  _masterToggle() {
    this._isAllSelected() ? this._selection.clear() :
      this._dataSource._dataSubject.getValue().forEach(row => this._selection.select(row));
  }//_masterToggle

  _onSortData(sort: Sort) {
    let it = this.columnDefs.filter(x => x.field == sort.active)[0];
    let field = it.sortField ? it.sortField : it.field;
    let s = { field: field, direction: sort.direction };
    if (this.useStaticSort) {
      let arr = this._dataSource._dataSubject.getValue();
      arr.sort(this._compareValues(s.field, s.direction));
      this._dataSource.refreshData(arr);
    }
    this.sortItems.next(s);
  }//onSortData

  _viewRecord(item: any) {
    this.viewItem.next(item);
  }//_viewRecord

  _viewLargeIcon(url: string) {
    if (!url) return;;
    url = this.redirectPipe.transform(url);
    this.dialogSrv.open(LargeIconViewerComponent, { width: '500px', height: '500px', data: { url: url } });
  }//viewLargeIcon


}
