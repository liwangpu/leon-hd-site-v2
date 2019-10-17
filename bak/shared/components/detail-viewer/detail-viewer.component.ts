import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LargeIconViewerComponent } from '../large-icon-viewer/large-icon-viewer.component';
import { Location } from "@angular/common";
@Component({
  selector: 'shared-detail-viewer',
  templateUrl: './detail-viewer.component.html',
  styleUrls: ['./detail-viewer.component.scss']
})
export class DetailViewerComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;
  constructor(private dialogSrv: MatDialog, protected locationSrv: Location) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  goBack() {
    this.locationSrv.back();


    // this.locationSrv
    // //目前有个问题,新建后如果改变的路径,点击返回不应该是回到新建的路径,应该是列表
    // if (this.recorderSrv.currentUrl && this.recorderSrv.previousUrl) {
    //   //当前路由和前一个路由是只差一点,说明应该是id的差异
    //   if (this.recorderSrv.currentUrl.indexOf(this.recorderSrv.previousUrl) > -1) {
    //     if (this.recorderSrv.firstTwoUrl)
    //       this.recorderSrv.gotoUrl(this.recorderSrv.firstTwoUrl);
    //     else
    //       this.recorderSrv.gotoUrl('/');
    //   }
    //   else {
    //     this.recorderSrv.gotoUrl(this.recorderSrv.previousUrl);
    //   }
    // } else {
    //   //上个路由,上上个路由都没有,调回到/
    //   this.recorderSrv.gotoUrl('/');
    // }
  }//goBack

  viewLargeIcon() {
    this.dialogSrv.open(LargeIconViewerComponent, { width: '500px', height: '500px', data: { url: this.icon } });
  }//viewLargeIcon

}
