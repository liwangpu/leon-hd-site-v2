import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { of, Observable } from 'rxjs';
import { AccessPointService } from '@app/feature/basic-ms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccessPointDetailComponent } from '../access-point-detail/access-point-detail.component';

@Component({
  selector: 'morejee-access-point',
  templateUrl: './access-point.component.html',
  styleUrls: ['./access-point.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class AccessPointComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected acpSrv: AccessPointService, protected router: Router, protected acr: ActivatedRoute, protected dialogSrv: MatDialog) {
    super(opsat);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name' }
      , { name: 'form.pointKey', field: 'pointKey', width: 300 }
      , { name: 'form.isInner', field: 'isInnerName', width: 60, sortField: 'isInner' }
      , { name: 'form.description', field: 'description' }
    ]);
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number, data: any[] }> {
    return this.acpSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    // this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
    let ins = this.dialogSrv.open(AccessPointDetailComponent, { width: '500px', height: '400px', disableClose: true, data: data });
    ins.componentInstance.afterSave.subscribe(() => this.refreshRecords());
  }//onViewRecord

  onAddRecord(): void {
    let ins = this.dialogSrv.open(AccessPointDetailComponent, { width: '500px', height: '400px', disableClose: true });
    ins.componentInstance.afterSave.subscribe(() => this.refreshRecords());
  }//onAddRecord

  onFilterRecords(param: object): void {
    // console.log('query param:', param);
    // let ins = this.dialogSrv.open(AccountFilterComponent, { width: '500px', height: '400px', disableClose: true, data: param });
    // ins.componentInstance.search.subscribe(form => this.advanceSearch(form));
    // ins.componentInstance.clearSearch.subscribe(() => this.advanceSearch());
  }//onFilterRecords

  onDeleteRecords(datas: any[]): void {
    // this.accountSrv.batchDelete(datas.map(x => x['id']).join(',')).subscribe(() => {
    //   this.msgSrv.saveSuccessfully();
    //   this.refreshRecords();
    // });
  }//onDeleteRecords

}
