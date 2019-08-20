import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SimpleViewerTableColumn } from '@app/shared';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '@app/feature/oms-ms';

@Component({
  selector: 'oms-aux-customer-select-dialog',
  templateUrl: './customer-select-dialog.component.html',
  styleUrls: ['./customer-select-dialog.component.scss']
})
export class CustomerSelectDialogComponent implements OnInit, OnDestroy {

  selectedIds: string;
  search = '';
  pageParam: any;
  dataQueryResult: any;
  columnDefs: SimpleViewerTableColumn[] = [
    { name: 'form.name', field: 'name' }
    , { name: 'form.phone', field: 'phone', width: 120 }
    , { name: 'form.mail', field: 'mail', width: 150 }
    , { name: 'form.address', field: 'address' }
  ];
  afterSelect = new Subject<string>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CustomerSelectDialogComponent>, private customerSrv: CustomerService) {

  }//constructor

  ngOnInit() {
  }//ngOnInit

  ngOnDestroy(): void {
    this.afterSelect.complete();
    this.afterSelect.unsubscribe();
  }//ngOnDestroy

  onTableQuery(prm: any) {
    this.pageParam = prm;
    let q = { ...prm, search: this.search ? this.search : '' };
    this.customerSrv.query(q).subscribe(res => this.dataQueryResult = res);
  }//onTableQuery

  onSelect(datas: any[]) {
    let idArr = datas.map(x => x.id);
    this.selectedIds = idArr.length > 0 ? idArr.join(',') : '';
  }//onSelect

  onConfirm() {
    this.afterSelect.next(this.selectedIds);
    this.dialogRef.close();
  }//onConfirm

}
