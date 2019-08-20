import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServerRedirectPipe, LargeIconViewerComponent } from '@app/shared';
import { OrderItem } from '@app/feature/oms-ms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'oms-order-detail-items',
  templateUrl: './order-detail-items.component.html',
  styleUrls: ['./order-detail-items.component.scss']
})
export class OrderDetailItemsComponent implements OnInit {

  displayedColumns: string[] = ['no', 'icon', 'productName', 'productSpecName', 'productBrand', 'productUnit', 'unitPrice', 'num', 'totalPrice'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @Input() set orderItems(val: OrderItem[]) {
    val = val && val.length > 0 ? val : [];
    for (let i = 0, len = val.length; i < len; i++) {
      val[i]['no'] = i + 1;
    }
    this.dataSource.data = val;

  }
  constructor(protected redirectPipe: ServerRedirectPipe, private dialogSrv: MatDialog) {

  }//constructor

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }//ngOnInit

  _viewLargeIcon(url: string) {
    if (!url) return;;
    url = this.redirectPipe.transform(url);
    this.dialogSrv.open(LargeIconViewerComponent, { width: '500px', height: '500px', data: { url: url } });
  }//viewLargeIcon

}
