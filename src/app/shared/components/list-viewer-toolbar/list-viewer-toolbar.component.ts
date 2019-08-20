import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ListViewerOpsatService } from '../../services/list-viewer-opsat.service';
import { filter, map, debounceTime, take } from 'rxjs/operators';
import { ListViewerTopicEnum } from '../../enums/list-viewer-topic-enum';
import { Subject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleConfirmDialogComponent } from '../simple-confirm-dialog/simple-confirm-dialog.component';

@Component({
  selector: 'shared-list-viewer-toolbar',
  templateUrl: './list-viewer-toolbar.component.html',
  styleUrls: ['./list-viewer-toolbar.component.scss']
})
export class ListViewerToolbarComponent implements OnInit, OnDestroy {

  private _refreshClockIntervalHandler: any;
  private _resetFreshClock$ = new Subject();
  private _refreshClockMinutePart = 0;
  private _refreshClockHourPart = 0;
  _showCancelSearchButton = false;
  _showAddButton = false;
  _showImportButton = false;
  _showExportButton = false;
  _showFilterButton = false;
  _showDeleteButton = false;
  _hideDrawerToggleButton = true;
  _drawerOpendState = false;
  get _drawerIconFlag() {
    return this._drawerOpendState ? "view_headline" : "vertical_split";
  };
  _lastUpdateMessage: string;
  _keyWordUp = new Subject<string>();
  enableDeleteButton = false;
  @Input() title: string;
  @ViewChild("searchCt", { static: true }) searchCt: ElementRef;
  constructor(protected opsatSrv: ListViewerOpsatService, protected translate: TranslateService, protected dialogSrv: MatDialog) {
    this.setClock();
    //订阅列表按钮状态事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._showHeaderAddButton), take(1)).subscribe(() => this._showAddButton = true);
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._showHeaderExportButton), take(1)).subscribe(() => this._showExportButton = true);
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._showHeaderImportButton), take(1)).subscribe(() => this._showImportButton = true);
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._showHeaderFilterButton), take(1)).subscribe(() => this._showFilterButton = true);
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._showHeaderDeleteButton), take(1)).subscribe(() => this._showDeleteButton = true);
    //订阅数据选中状态改变事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.dataSelectedChange), map(tp => tp.data)).subscribe(items => this.enableDeleteButton = items.length > 0);
    //订阅数据刷新事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.listDataChange)).subscribe(() => this._resetFreshClock$.next());
    //订阅抽屉启用事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._enabledListDrawer), take(1)).subscribe(() => {
      this._hideDrawerToggleButton = false;
    });
    //订阅列表抽屉变动事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._listDrawerToggle), map(tp => tp.data)).subscribe((state: string) => {
      this._drawerOpendState = state == 'open';
    });
    //订阅页面首次加载默认查询参数
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._initSearchInput), map(tp => tp.data), take(1)).subscribe(val => {
      this.searchCt.nativeElement.value = val;
    });
    //订阅查询参数改变事件,用来显示取消搜索按钮
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.requestData), map(tp => tp.data)).subscribe(prm => {
      if (prm['page'] != 1) {
        this._showCancelSearchButton = true;
        return;
      }

      if (prm['pageSize'] != 25) {
        this._showCancelSearchButton = true;
        return;
      }

      if (prm['search']) {
        this._showCancelSearchButton = true;
        return;
      }

      let keys = Object.keys(prm);
      // console.log(112341,keys);
      if (keys.length >= 3) {
        this._showCancelSearchButton = true;
        return;
      }

      this._showCancelSearchButton = false;
    });

  }//constructor

  ngOnInit() {
    //搜索框改变事件
    this._keyWordUp.pipe(debounceTime(500)).subscribe(kw => this.opsatSrv.publish(ListViewerTopicEnum._keywordChange, kw));//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this._resetFreshClock$.complete();
    this._resetFreshClock$.unsubscribe();
    this._keyWordUp.complete();
    this._keyWordUp.unsubscribe();
  }//ngOnDestroy

  setClock() {
    //设置刷新时钟
    let refreshListSubscrition = Observable.create((observer: Subject<number>) => {
      //_resetFreshClock$作为调节时钟的中介
      this._resetFreshClock$.subscribe(() => {
        //先清除上一个时钟
        if (this._refreshClockIntervalHandler)
          clearInterval(this._refreshClockIntervalHandler);
        let seconds = 0;
        this._refreshClockIntervalHandler = setInterval(() => {
          seconds++;
          observer.next(seconds)
        }, 1000);
      }, err => { }, () => {
        if (this._refreshClockIntervalHandler)
          clearInterval(this._refreshClockIntervalHandler);
        observer.complete();
      });//subscribe this._resetFreshClock$
    });//create

    //订阅时钟更新刷新显示列表最后更新事件
    refreshListSubscrition.subscribe(seconds => {
      if (seconds == 1) {
        this.translate.get('message.listViewerLastUpdateMessage_just').subscribe(msg => this._lastUpdateMessage = msg);
      }
      //15s为刷新基点
      if (seconds % 60 != 0)
        return;

      if (seconds >= 3600) {
        let remainder = seconds % 3600;
        this._refreshClockHourPart = (seconds - remainder) / 3600;
        //取完小时后减去相应秒数
        seconds = seconds - this._refreshClockHourPart * 3600;
      }
      else {
        this._refreshClockHourPart = 0;
      }

      if (seconds >= 60) {
        let remainder = seconds % 60;
        this._refreshClockMinutePart = (seconds - remainder) / 60;
        //取完分钟后减去相应秒数
        seconds = seconds - this._refreshClockMinutePart * 60;
      }
      else {
        this._refreshClockMinutePart = 0;
      }


      let translateParams = { hour: this._refreshClockHourPart, minute: this._refreshClockMinutePart };

      if (this._refreshClockHourPart == 0) {
        if (this._refreshClockMinutePart == 1)
          this.translate.get('message.listViewerLastUpdateMessage_minute', translateParams).subscribe(msg => this._lastUpdateMessage = msg);
        else
          this.translate.get('message.listViewerLastUpdateMessage_minutes', translateParams).subscribe(msg => this._lastUpdateMessage = msg);
      }
      else if (this._refreshClockHourPart == 1) {
        if (this._refreshClockMinutePart == 0)
          this.translate.get('message.listViewerLastUpdateMessage_hour', translateParams).subscribe(msg => this._lastUpdateMessage = msg);
        else if (this._refreshClockMinutePart == 1)
          this.translate.get('message.listViewerLastUpdateMessage_hourAndMinute', translateParams).subscribe(msg => this._lastUpdateMessage = msg);
        else
          this.translate.get('message.listViewerLastUpdateMessage_hourAndMinutes', translateParams).subscribe(msg => this._lastUpdateMessage = msg);
      }
      else {
        if (this._refreshClockMinutePart == 0)
          this.translate.get('message.listViewerLastUpdateMessage_hours', translateParams).subscribe(msg => this._lastUpdateMessage = msg);
        else if (this._refreshClockMinutePart == 1)
          this.translate.get('message.listViewerLastUpdateMessage_hoursAndMinute', translateParams).subscribe(msg => this._lastUpdateMessage = msg);
        else
          this.translate.get('message.listViewerLastUpdateMessage_hoursAndMinutes', translateParams).subscribe(msg => this._lastUpdateMessage = msg);
      }
    });//subscribe

  }//setClock

  initQuery() {
    this.searchCt.nativeElement.value = '';
    this._showCancelSearchButton = false;
    this.opsatSrv.publish(ListViewerTopicEnum._cancelAllSearch);
  }//initQuery

  addRecord() {
    this.opsatSrv.publish(ListViewerTopicEnum.addRecord);
  }//addRecord

  refreshData() {
    this.opsatSrv.publish(ListViewerTopicEnum._queryData);
  }//refreshData

  filterData() {
    this.opsatSrv.publish(ListViewerTopicEnum.filterRecords, this.opsatSrv.extQueryParam);
  }//filterData

  deleteRecords() {
    if (!this.opsatSrv.selectedItems || this.opsatSrv.selectedItems.length == 0) return;
    this.translate.get("message.areYouSureDeleteSelectedRecords").subscribe(msg => {
      let ins = this.dialogSrv.open(SimpleConfirmDialogComponent, { width: "350px", height: "250px", data: { message: msg } });
      ins.componentInstance.confirm.subscribe(() => {
        this.opsatSrv.publish(ListViewerTopicEnum.deleteRecords, this.opsatSrv.selectedItems);
      });//subscribe
    });
  }//deleteRecords

  toggleDrawer() {
    this._drawerOpendState = !this._drawerOpendState;
    this.opsatSrv.publish(ListViewerTopicEnum._listDrawerToggle, this._drawerOpendState ? "open" : "close");
  }//toggleDrawer

}
