import { Component, OnInit } from '@angular/core';
import { AppNav } from '../../models/app-nav';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterRecorderService } from '@app/core';

@Component({
  selector: 'main-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.scss']
})
export class LauncherComponent implements OnInit {

  private _latestNavShowSum = 8;//最近项目最多展示的数量
  _currentNavName: string;
  _latestNavVisible = true;//最近使用项目可见性
  _allNavVisible = true;//所有项目可见性
  _latestNavs: Array<AppNav> = [];
  _allNavs: Array<AppNav> = [];
  constructor(public dialogRef: MatDialogRef<LauncherComponent>, protected router: Router, protected routerRecorderSrv: RouterRecorderService) {
    this._allNavs = AppNav.getAppNavs();
  }//constructor

  ngOnInit() {
    // //遍历取最近浏览项目
    // for (let i = 0, len = this.routerRecorderSrv.latestVisited.length; i < len; i++) {
    //   if (this._latestNavs.length == this._latestNavShowSum)
    //     break;
    //   let url = this.routerRecorderSrv.latestVisited[i];
    //   let mapItem = AppNav.getMapNav(url);
    //   if (!mapItem) continue;
    //   let exist = this._latestNavs.some(x => x.url == mapItem.url);
    //   if (!exist)
    //     this._latestNavs.push(mapItem);
    // }//for

  }//ngOnInit

  toggleLatestNavVisible() {
    this._latestNavVisible = !this._latestNavVisible;
  }//toggleLatestNavVisible

  toggleAllNavVisible() {
    this._allNavVisible = !this._allNavVisible;
  }//toggleAllNavVisible

  gotoRoute(nav: AppNav) {
    if (!nav || !nav.url) return;
    this.router.navigateByUrl(nav.url);
    this.dialogRef.close();
  }//gotoRoute

}
