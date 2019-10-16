import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { Observable, of } from 'rxjs';
import { AccountService } from '@app/feature/basic-ms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageCenterService } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountFilterComponent } from '../account-filter/account-filter.component';


@Component({
  selector: 'basic-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class AccountComponent extends ListViewerLauncher implements OnInit {


  constructor(protected opsat: ListViewerOpsatService, protected accountSrv: AccountService, protected router: Router, protected acr: ActivatedRoute, protected msgSrv: MessageCenterService, protected dialogSrv: MatDialog) {
    super(opsat);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name' }
      , { name: 'form.mail', field: 'mail', width: 200 }
      , { name: 'form.phone', field: 'phone', width: 120 }
      , { name: 'form.description', field: 'description' }
      // , { name: 'form.modifiedTime', field: 'modifiedTime', width: 120 }
    ]);
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number, data: any[] }> {
    return this.accountSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    this.router.navigate(['./detail'], { relativeTo: this.acr });
  }//onAddRecord

  onFilterRecords(param: object): void {
    // console.log('query param:', param);
    let ins = this.dialogSrv.open(AccountFilterComponent, { width: '500px', height: '400px', disableClose: true, data: param });
    ins.componentInstance.search.subscribe(form => this.advanceSearch(form));
    ins.componentInstance.clearSearch.subscribe(() => this.advanceSearch());
  }//onFilterRecords

  onDeleteRecords(datas: any[]): void {
    this.accountSrv.batchDelete(datas.map(x => x['id']).join(',')).subscribe(() => {
      this.msgSrv.saveSuccessfully();
      this.refreshRecords();
    });
  }//onDeleteRecords


}