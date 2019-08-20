import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageCenterService } from '@app/core';
import { Observable, of } from 'rxjs';
import { OrderService } from '@app/feature/oms-ms';

@Component({
  selector: 'oms-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class OrderComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected apiSrv: OrderService, protected router: Router, protected acr: ActivatedRoute, protected msgSrv: MessageCenterService) {
    super(opsat);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name' }
      , { name: 'form.orderNo', field: 'orderNo', width: 120 }
      , { name: 'form.totalNum', field: 'totalNum', width: 80 }
      , { name: 'form.totalPrice', field: 'totalPrice', width: 80 }
      , { name: 'form.contactName', field: 'contactName', width: 120 }
      , { name: 'form.contactPhone', field: 'contactPhone', width: 120 }
      , { name: 'form.shippingAddress', field: 'shippingAddress', width: 320 }
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