import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AppNav } from '../../models/app-nav';
import { RouterRecorderService } from '@app/core';
import { Subject, merge } from 'rxjs';
import { takeUntil, debounceTime, delay, take, skip } from 'rxjs/operators';

@Component({
  selector: 'main-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {


  hideNavs = true;
  minNavs = false;
  latestNavs: AppNav[] = [];
  destroy$ = new Subject();
  windowResize$ = new Subject();
  @ViewChild('recentNavCt', { static: true }) recentNavCt: ElementRef;
  @HostListener('window:resize')
  public detectResize(): void {
    this.windowResize$.next();
  }
  constructor(protected recorderSrv: RouterRecorderService, ) {

  }//constructor

  ngOnInit() {
    //页面渲染结束后初始化导航栏
    this.recorderSrv.currentVisitedChange.pipe(takeUntil(this.destroy$), delay(500), take(1)).subscribe(url => {
      let nv = AppNav.getMapNav(url);

      if (!nv) return;
      this.judeCurrentNavMode(nv.url);
      let count = this.reCalcDisplayNavCount();
      this.latestNavs = AppNav.getMapNavs(this.recorderSrv.latestVisited.slice(0, count));

      // console.log('init:',nv,this.latestNavs,this.recorderSrv.latestVisited,count);
    });//subscribe
    //路由改变或者窗口大小改变时候,调整最近导航栏
    merge(this.recorderSrv.currentVisitedChange.pipe(skip(1)), this.windowResize$.pipe(debounceTime(500))).subscribe((url: string) => {
      if (url) {
        let nv = AppNav.getMapNav(url);
        if (nv) {
          let exist = this.latestNavs.some(x => x.url == nv.url);
          if (!exist) {
            this.latestNavs.unshift(nv);
          }
        }
        this.judeCurrentNavMode(nv ? nv.url : undefined);
      }//if

      let capacityCount = this.reCalcDisplayNavCount();
      let latestNavCount = this.latestNavs.length;
      if (latestNavCount > capacityCount) {
        this.latestNavs = this.latestNavs.slice(0, capacityCount);
      }
      else {
        let canAddNavCount = capacityCount - latestNavCount;
        for (let i = 0, len = this.recorderSrv.latestVisited.length; i < len; i++) {
          if (canAddNavCount < 1) break;
          let u = this.recorderSrv.latestVisited[i];
          let nv = AppNav.getMapNav(u);
          if (!nv) continue;
          let exist = this.latestNavs.some(x => x.url == nv.url);
          if (!exist) {
            this.latestNavs.push(nv);
            canAddNavCount--;
          }
        }//for
      }//else

    })//subscribe
  }//ngOnInit

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }//ngOnDestroy

  toggleRencentNav() {
    this.minNavs = !this.minNavs;
  }//toggleRencentNav

  judeCurrentNavMode(url: string) {
    if (!url) {
      this.hideNavs = true;
      return;
    }
    let nav = AppNav.getMapNav(url);
    this.hideNavs = !(nav && nav.recentnav);
  }//judeCurrentNavMode

  reCalcDisplayNavCount() {
    let itemMinWh = 80;//一个nav的宽度
    let wh = this.recentNavCt.nativeElement.offsetWidth;
    let res = wh % itemMinWh;
    return (wh - res) / itemMinWh - 1;//比实际能容量的少一个,不然显得太挤
  }//reCalcDisplayNavCount

}
