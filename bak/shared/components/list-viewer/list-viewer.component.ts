import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { Location } from '@angular/common';
import { ListViewerOpsatService } from '../../services/list-viewer-opsat.service';
import { filter, map, tap } from 'rxjs/operators';
import { ListViewerTopicEnum } from '../../enums/list-viewer-topic-enum';
import { MatDrawer } from '@angular/material/sidenav';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import * as queryString from 'query-string';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RouterRecorderService } from '@app/core';

@Component({
  selector: 'shared-list-viewer',
  templateUrl: './list-viewer.component.html',
  styleUrls: ['./list-viewer.component.scss']
})
export class ListViewerComponent implements OnInit, AfterContentInit, OnDestroy {


  private _pageIndex = 1;
  private _pageSize = this.opsatSrv.paginatorOptions[0];
  private _keyword: string;
  private _orderBy: string;
  private _desc: boolean;
  private _extQueryParam: object;
  private _mediaWatcher: Subscription;
  _drawerMode = 'side';
  _drawerOpendState = false;
  _lastUpdateMessage: string;
  @Input() title: string;
  @Input() set headerButtons(val: string) {
    if (!val) return;
    val = val.toLocaleLowerCase();
    if (val.indexOf('add-recorder') > -1)
      this.opsatSrv.publish(ListViewerTopicEnum._showHeaderAddButton);
    if (val.indexOf('import-recorders') > -1)
      this.opsatSrv.publish(ListViewerTopicEnum._showHeaderImportButton);
    if (val.indexOf('export-recorders') > -1)
      this.opsatSrv.publish(ListViewerTopicEnum._showHeaderExportButton);
    if (val.indexOf('filter-recorders') > -1)
      this.opsatSrv.publish(ListViewerTopicEnum._showHeaderFilterButton);
    if (val.indexOf('delete-recorders') > -1)
      this.opsatSrv.publish(ListViewerTopicEnum._showHeaderDeleteButton);
  }
  @ViewChild('drawerCt', { static: true }) drawerCt: MatDrawer;
  @ViewChild('leftPartCt', { static: true }) leftPartCt: ElementRef;
  constructor(protected opsatSrv: ListViewerOpsatService, protected mediaObserver: MediaObserver, protected router: Router, protected recorderSrv: RouterRecorderService, protected locationSrv: Location) {
    //订阅关键词改变事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._keywordChange), map(tp => tp.data), tap(kw => this._keyword = kw)).subscribe(() => this.opsatSrv.publish(ListViewerTopicEnum.requestData, this.prepareQueryParam()));//
    //订阅分页参数改变事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._pageParamChange), map(tp => tp.data), tap(param => {
      this._pageIndex = param.page;
      this._pageSize = param.pageSize;
    })).subscribe(() => this.opsatSrv.publish(ListViewerTopicEnum.requestData, this.prepareQueryParam()));
    //订阅高级搜索参数事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._appendExtQueryParam), map(tp => tp.data), tap(param => this._extQueryParam = param)).subscribe(() => this.opsatSrv.publish(ListViewerTopicEnum.requestData, this.prepareQueryParam()));
    //订阅发布异步请求数据信息
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._queryData)).subscribe(() => this.opsatSrv.publish(ListViewerTopicEnum.requestData, this.prepareQueryParam()));//subscribe
    //订阅列表抽屉变动事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._listDrawerToggle), map(tp => tp.data)).subscribe((state: string) => {
      if (!this.drawerCt) return;
      
      if (state == 'open')
        this.drawerCt.open();
      else
        this.drawerCt.close();
    });//subscribe
    //订阅撤销所有搜索事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._cancelAllSearch)).subscribe(() => {
      this.resetQueryParam();
      this.opsatSrv.publish(ListViewerTopicEnum.requestData, this.prepareQueryParam());
    });
    //订阅列表排序事件
    this.opsatSrv.message.pipe(
      filter(tp => tp.topic == ListViewerTopicEnum.sortData),
      map(tp => tp.data),
      tap(sort => {
        if (sort.direction != '') {
          this._orderBy = sort.field;
          this._desc = sort.direction == 'desc' ? true : false;
        }
        else {
          this._orderBy = '';
          this._desc = false;
        }
      }),
      map(() => this.prepareQueryParam())
    ).subscribe(prm => this.opsatSrv.publish(ListViewerTopicEnum.requestData, prm));//subscribe
    //订阅查询事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.requestData), map(tp => tp.data)).subscribe(obj => {
      let prmStr = queryString.stringify(obj);
      // let url = `${this.recorderSrv.currentUrl}?${prmStr}`;
      // console.log(111,url);
      let urlArr = this.router.url.split('?');
      this.recorderSrv.recordUrl(`${urlArr[0]}?${prmStr}`);
      this.locationSrv.go(urlArr[0], prmStr);

      // this.recorderSrv.gotoUrl(url);
    });
  }//constructor

  ngOnInit() {
    //默认第一次数据查询

    let urlArr = this.router.url.split('?');
    if (urlArr[1]) {
      let queryPrm: Object = queryString.parse(urlArr[1]);
      this._pageIndex = Number(queryPrm["page"]);
      this._pageSize = Number(queryPrm["pageSize"]);
      this._keyword = queryPrm["search"] ? queryPrm["search"] : '';

      let keys = Object.keys(queryPrm);
      if (keys.some(x => x == "page"))
        delete queryPrm["page"];
      if (keys.some(x => x == "pageSize"))
        delete queryPrm["pageSize"];
      if (keys.some(x => x == "search"))
        delete queryPrm["search"];


      if (this._keyword)
        this.opsatSrv.publish(ListViewerTopicEnum._initSearchInput, this._keyword);
      keys = Object.keys(queryPrm);
      if (keys.length > 0) {
        this._extQueryParam = queryPrm;
        this.opsatSrv.publish(ListViewerTopicEnum._initExtQueryParam, this._extQueryParam);
      }
    }//if


    this.opsatSrv.publish(ListViewerTopicEnum._queryData);
  }//ngOnInit

  ngAfterContentInit(): void {
    if (this.leftPartCt && this.leftPartCt.nativeElement && this.leftPartCt.nativeElement.childNodes.length > 0) {
      //订阅屏幕改变事件
      this._mediaWatcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
        this._drawerMode = change.mqAlias == 'sm' || change.mqAlias == 'xs' ? "push" : "side";
      });//subscribe
      this.opsatSrv.publish(ListViewerTopicEnum._enabledListDrawer);
    }//if
  }//ngAfterContentInit

  ngOnDestroy(): void {
    if (this._mediaWatcher)
      this._mediaWatcher.unsubscribe();
  }//ngOnDestroy

  resetQueryParam() {
    this._pageIndex = 1;
    this._pageSize = 25;
    this._keyword = null;
    this._extQueryParam = null;
    this._orderBy = null;
    this._desc = false;
  }//prepareInitQuery

  prepareQueryParam() {
    let prm = {
      page: this._pageIndex,
      pageSize: this._pageSize
    };

    if (this._extQueryParam) {
      prm = { ...prm, ...this._extQueryParam };
    }

    if (this._orderBy) {
      prm['orderBy'] = this._orderBy;
      prm['desc'] = this._desc;
    }//if

    if (this._keyword) {
      prm['search'] = this._keyword;
    }//if

    return prm;
  }//prepareQueryParam

}
