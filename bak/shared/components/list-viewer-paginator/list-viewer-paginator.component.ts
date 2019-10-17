import { Component, OnInit, ViewChild } from '@angular/core';
import { ListViewerOpsatService } from '../../services/list-viewer-opsat.service';
import { filter, map } from 'rxjs/operators';
import { ListViewerTopicEnum } from '../../enums/list-viewer-topic-enum';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'shared-list-viewer-paginator',
  templateUrl: './list-viewer-paginator.component.html',
  styleUrls: ['./list-viewer-paginator.component.scss']
})
export class ListViewerPaginatorComponent implements OnInit {

  totalData = 0;
  selectedItemCount = 0;
  pageSize = 25;
  pageIndex = 0;
  @ViewChild(MatPaginator, { static: true }) paginatorCt: MatPaginator;
  constructor(public opsatSrv: ListViewerOpsatService, private translate: TranslateService) {

    //订阅列表数据改变事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.listDataChange), map(tp => tp.data)).subscribe(result => this.totalData = result.total);
    //订阅选中项改变事件
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.dataSelectedChange), map(tp => tp.data)).subscribe(items => this.selectedItemCount = items.length);
  }//constructor

  ngOnInit() {
    this.opsatSrv.message.pipe(filter(tp => tp.topic == ListViewerTopicEnum.requestData), map(tp => tp.data)).subscribe(prm => {
      this.pageIndex = prm.page - 1;
      this.pageSize = prm.pageSize;
    });
    this.paginatorCt._intl.itemsPerPageLabel = '';
    this.translate.get('tip.itemsPerPage').subscribe(msg => this.paginatorCt._intl.itemsPerPageLabel = msg);
    // ="开心就好";
  }//ngOnInit

  onPageChange(evt: PageEvent) {
    let pageParam = { page: evt.pageIndex + 1, pageSize: evt.pageSize };
    this.opsatSrv.publish(ListViewerTopicEnum._pageParamChange, pageParam);
  }//onPageChange

}
