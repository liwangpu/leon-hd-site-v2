import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServerRedirectPipe, LargeIconViewerComponent } from '@app/shared';
import { ProductPermissionGroupService } from '@app/feature/morejee-ms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'morejee-aux-organization-permissin-product',
  templateUrl: './organization-permissin-product.component.html',
  styleUrls: ['./organization-permissin-product.component.scss']
})
export class OrganizationPermissinProductComponent implements OnInit {

  _searchKeyWord: string;
  @Input() organizationId: string;
  displayedColumns: string[] = ['no', 'icon', 'name', 'categoryName', "groupName", "description"];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(protected groupSrv: ProductPermissionGroupService,protected redirectPipe: ServerRedirectPipe, private dialogSrv: MatDialog) {

  }//constructor

  ngOnInit() {
    this.groupSrv.getOrganizationAllPermissionProduct(this.organizationId, this._searchKeyWord).pipe(map(list => {
      for (let i = 0, len = list.length; i < len; i++) {
        list[i]['no'] = i + 1;
      }
      return list;
    })).subscribe(list => this.dataSource.data = list);
    this.dataSource.sort = this.sort;
  }//ngOnInit

  _viewLargeIcon(url: string) {
    if (!url) return;;
    url = this.redirectPipe.transform(url);
    this.dialogSrv.open(LargeIconViewerComponent, { width: '500px', height: '500px', data: { url: url } });
  }//viewLargeIcon
}
