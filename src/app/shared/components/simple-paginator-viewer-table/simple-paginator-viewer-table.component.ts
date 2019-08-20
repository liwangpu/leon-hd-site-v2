import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SimpleViewerTableColumn } from '@app/shared';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'shared-simple-paginator-viewer-table',
  templateUrl: './simple-paginator-viewer-table.component.html',
  styleUrls: ['./simple-paginator-viewer-table.component.scss']
})
export class SimplePaginatorViewerTableComponent implements OnInit {

  get total() {
    if (!this.result) return 0;
    return this.result.total ? this.result.total : 0;
  }
  get datas() {
    if (!this.result) return [];
    return this.result.data ? this.result.data : [];
  }
  @Input() columnDefs: SimpleViewerTableColumn[];
  @Input() result: { total: number, data: any[] };
  @Output() query = new EventEmitter<{ page: number, pageSize: number }>();
  @Output() selectItems = new EventEmitter();
  constructor() {

  }//constructor

  ngOnInit() {
    //执行初始化查询
    this.query.next({ page: 1, pageSize: 25 });
  }//ngOnInit

  onPageChange(evt: PageEvent) {
    this.query.next({ page: evt.pageIndex + 1, pageSize: evt.pageSize });
  }//onPageChange

}
