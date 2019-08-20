import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '@app/feature/oms-ms';
import { MessageCenterService } from '@app/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'oms-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class CustomerComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected apiSrv: CustomerService, protected router: Router, protected acr: ActivatedRoute, protected msgSrv: MessageCenterService) {
    super(opsat);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name' }
      , { name: 'form.phone', field: 'phone', width: 120 }
      , { name: 'form.mail', field: 'mail', width: 180 }
      , { name: 'form.address', field: 'address', width: 320 }
      , { name: 'form.description', field: 'description' }
    ]);
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number; data: any[]; }> {
    return this.apiSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    // this.router.navigate(['./detail'], { relativeTo: this.acr });

  }//onAddRecord

  onFilterRecords(param: object): void {
    throw new Error("Method not implemented.");
  }//onFilterRecords

  onDeleteRecords(datas: any[]): void {
    // let idArr = datas.map(x => x.id);
    // this.mapSrv.batchDelete(idArr.join(',')).subscribe(()=>{
    //   this.msgSrv.saveSuccessfully();
    //   this.refreshRecords();
    // });
  }//onDeleteRecords

}