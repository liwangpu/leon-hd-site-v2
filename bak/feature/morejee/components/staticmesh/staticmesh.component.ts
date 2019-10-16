import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { Observable, of } from 'rxjs';
import { StaticmeshService } from '@app/feature/morejee-ms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'morejee-staticmesh',
  templateUrl: './staticmesh.component.html',
  styleUrls: ['./staticmesh.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class StaticmeshComponent extends ListViewerLauncher implements OnInit {


  constructor(protected opsat: ListViewerOpsatService, protected meshSrv: StaticmeshService, protected router: Router, protected acr: ActivatedRoute,protected msgSrv: MessageCenterService) {
    super(opsat);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name' }
      , { name: 'form.hasRelatedProductSpec', field: 'hasRelatedProduct' }
    ]);
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number; data: any[]; }> {
    return this.meshSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    this.router.navigate(['./detail'], { relativeTo: this.acr });
  }//onAddRecord

  onFilterRecords(param: object): void {
    throw new Error("Method not implemented.");
  }

  onDeleteRecords(datas: any[]): void {
    let idArr = datas.map(x => x.id);
    this.meshSrv.batchDelete(idArr.join(',')).subscribe(() => {
      this.msgSrv.saveSuccessfully();
      this.refreshRecords();
    });
  }//onDeleteRecords

}
