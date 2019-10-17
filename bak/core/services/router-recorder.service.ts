import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


const LocationHistoryKey = "location-histories";
/**
 * 记录最近访问路由信息,仅记录最近30个
 * 不记录查询参数,否则太多了
 * 虽然改服务用为全局,但是基本就是为了feature/main模块使用,所以其他模块应该不使用这个服务
 */
@Injectable()
export class RouterRecorderService {

  private _currentVisitedChange = new BehaviorSubject<string>(null);
  // private _locationHistories: Array<string> = [];
  // set locationHistories(val: Array<string>) {
  //   this._locationHistories = val;
  //   this.localStoreSrv.setItem(LocationHistoryKey, JSON.stringify(this._locationHistories));
  // }
  // get locationHistories() {
  //   return this._locationHistories;
  // }
  // get currentUrl() {
  //   return this.locationHistories[0];
  // }
  // get previousUrl() {
  //   return this.locationHistories[1];
  // }
  // get firstTwoUrl() {
  //   return this.locationHistories[2];
  // }
  latestVisited: Array<string> = [];//这个是不包含查询参数的
  currentVisitedChange = this._currentVisitedChange.asObservable();
  constructor(protected localStoreSrv: LocalStoreService, protected router: Router) {
    // let historyStr = this.localStoreSrv.getItem(LocationHistoryKey);
    // if (historyStr && historyStr.length > 0) {
    //   this._locationHistories = JSON.parse(historyStr);
    // }

    // let str = this.localStoreSrv.getItem(this._routerRecorderStoreKey);
    // if (str && str.length > 0) {
    //   this.latestVisited = JSON.parse(str);
    // }
  }//constructor

  recordUrl(url: string) {
    // //原始的记录最近访问的路径
    // this.locationHistories.unshift(url);
    // let hLen = this.locationHistories.length;
    // this.locationHistories = this.locationHistories.slice(0, 3);
    //接着处理应用程序app启动url
    url = url.toLocaleLowerCase();
    let main = url.indexOf("?") > -1 ? url.split('?')[0] : url;

    // //不记录主页
    // if (url == '/' || url == '/app') {
    //   return;
    // }

    for (let i = 0, len = this.latestVisited.length; i < len; i++) {
      let it = this.latestVisited[i];
      if (it == main) {
        this.latestVisited[i] = undefined;
        break;
      }
    }//for

    this.latestVisited.unshift(main);
    this.latestVisited = this.latestVisited.filter(x => x);
    this.latestVisited = this.latestVisited.splice(0, 30);
    this._currentVisitedChange.next(main);

    // this.localStoreSrv.setItem(this._routerRecorderStoreKey, JSON.stringify(this.latestVisited));
  }//recordUrl

  // gotoUrl(url: string) {
  //   this.recordUrl(url);
  //   this.router.navigateByUrl(url);
  // }//gotoUrl

  // gotoPreviousUrl() {

  // }//gotoPreviousUrl

}
