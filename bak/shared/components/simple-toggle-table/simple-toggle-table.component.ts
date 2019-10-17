import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { SimpleViewerTableColumn } from '@app/shared';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';

class SimpleToggleTableDataSource implements DataSource<any>{

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

}//SimpleToggleTableDataSource

@Component({
  selector: 'shared-simple-toggle-table',
  templateUrl: './simple-toggle-table.component.html',
  styleUrls: ['./simple-toggle-table.component.scss']
})
export class SimpleToggleTableComponent implements OnInit, AfterViewInit {


  private _columnDefs: SimpleViewerTableColumn[] = [];
  _hasIconColumnDef = false;
  _nameColumnDef: SimpleViewerTableColumn;
  columnsToDisplay: string[] = [];
  @Input() set columnDefs(val: SimpleViewerTableColumn[]) {
    if (!val || val.length < 1) return;
    this._columnDefs = val;
    this._columnDefs.unshift({ name: '_seqno', field: '_seqno' });
    this._columnDefs.push({ name: '_toggle', field: '_toggle' });
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
    this._dataSource.refreshData(val);
  }
  @Input() set selected(ids: string[]) {
    if (!ids || ids.length < 1) return;
    setTimeout(() => {
      this._dataSource._dataSubject.getValue().forEach(row => {
        let exist = ids.some(x => x == row["id"]);
        if (exist)
          this._selection.select(row);
      });
    }, 200);
  }
  @Input() disabled: string;
  @Output() viewItem = new EventEmitter();
  @Output() selectItemChange = new EventEmitter();
  _selection = new SelectionModel<any>(true, []);
  _dataSource = new SimpleToggleTableDataSource();
  _destroy$ = new Subject<boolean>();
  constructor() {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._selection.changed.pipe(debounceTime(150)).pipe(takeUntil(this._destroy$)).subscribe(res => this.selectItemChange.next(res.source.selected));//subscribe
    }, 1000);
  }//ngAfterViewInit

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }//ngOnDestroy

  _isAllSelected() {
    const numSelected = this._selection.selected.length;
    const numRows = this._dataSource._dataSubject.getValue().length;
    return numSelected === numRows;
  }//_isAllSelected

  _masterToggle() {
    this._isAllSelected() ? this._selection.clear() :
      this._dataSource._dataSubject.getValue().forEach(row => this._selection.select(row));
  }//_masterToggle

  _viewRecord(item: any) {
    this.viewItem.next(item);
  }//_viewRecord
}
