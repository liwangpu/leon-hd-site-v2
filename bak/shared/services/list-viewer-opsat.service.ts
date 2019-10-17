import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ListViewerTopicEnum } from '../enums/list-viewer-topic-enum';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ListViewerOpsatService implements OnDestroy {

  private _extQueryParam: object;
  private _selectedItems: any[] = [];
  private _message = new ReplaySubject<{ topic: ListViewerTopicEnum, data?: any }>(25);
  message = this._message.asObservable();
  //为了快捷,在服务上冗余一个选中的项信息
  get selectedItems() {
    return this._selectedItems;
  }
  get paginatorOptions() {
    return [25, 50, 100];
  }
  get extQueryParam() {
    return this._extQueryParam;
  }
  constructor() {
    //订阅选中项目改变事件
    this.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.dataSelectedChange), map(tp => tp.data)).subscribe(items => this._selectedItems = items);//subscribe
    //订阅高级过滤参数改变事件
    this.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum._appendExtQueryParam), map(tp => tp.data)).subscribe(param => this._extQueryParam = param);
  }//constructor

  ngOnDestroy(): void {
    this._message.complete();
    this._message.unsubscribe();
  }//ngOnDestroy

  publish(topic: ListViewerTopicEnum, data?: any) {
    if (this._message.isStopped || this._message.closed) return;
    this._message.next({ topic: topic, data: data });
  }//publish

}
