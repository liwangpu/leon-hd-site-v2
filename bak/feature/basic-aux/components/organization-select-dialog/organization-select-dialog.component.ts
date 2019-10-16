import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SimpleViewerTableColumn } from '@app/shared';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from '@app/feature/basic-ms';

@Component({
  selector: 'basic-aux-organization-select-dialog',
  templateUrl: './organization-select-dialog.component.html',
  styleUrls: ['./organization-select-dialog.component.scss']
})
export class OrganizationSelectDialogComponent implements OnInit, OnDestroy {

  selectedIds: string;
  search = '';
  pageParam: any;
  organQueryResult: any;
  columnDefs: SimpleViewerTableColumn[] = [
    { name: 'form.name', field: 'name' }
    , { name: 'form.description', field: 'description' }
  ];
  afterSelect = new Subject<string>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<OrganizationSelectDialogComponent>, private organSrv: OrganizationService) {

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
    this.organSrv.query(q).subscribe(res => this.organQueryResult = res);
  }//onTableQuery

  onOrganSelected(datas: any[]) {
    let idArr = datas.map(x => x.id);
    this.selectedIds = idArr.length > 0 ? idArr.join(',') : '';
  }//onOrganSelected

  onConfirm() {
    this.afterSelect.next(this.selectedIds);
    this.dialogRef.close();
  }//onConfirm

}
