import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SimpleViewerTableColumn } from '@app/shared';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '@app/feature/morejee-ms';

@Component({
  selector: 'morejee-aux-product-select-dialog',
  templateUrl: './product-select-dialog.component.html',
  styleUrls: ['./product-select-dialog.component.scss']
})
export class ProductSelectDialogComponent implements OnInit, OnDestroy {


  selectedIds: string;
  search = '';
  pageParam: any;
  productQueryResult: any;
  columnDefs: SimpleViewerTableColumn[] = [
    { name: 'form.name', field: 'name' }
    , { name: 'form.category', field: 'categoryName', sortField: 'categoryId', width: 180 }
    , { name: 'form.description', field: 'description' }
  ];
  afterSelect = new Subject<string>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductSelectDialogComponent>, private productSrv: ProductService) {

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
    this.productSrv.query(q).subscribe(res => this.productQueryResult = res);
  }//onTableQuery

  onProductSelect(datas: any[]) {
    let idArr = datas.map(x => x.id);
    this.selectedIds = idArr.length > 0 ? idArr.join(',') : '';
  }//onProductSelect

  onConfirm() {
    this.afterSelect.next(this.selectedIds);
    this.dialogRef.close();
  }//onConfirm

}
