import { Component, OnInit } from '@angular/core';
import { ListViewerLauncher, ListViewerOpsatService, ListViewerTableColumn } from '@app/shared';
import { Observable, of } from 'rxjs';
import { MapService } from '@app/feature/morejee-ms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'morejee-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class MapComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected mapSrv: MapService, protected router: Router, protected acr: ActivatedRoute,protected msgSrv: MessageCenterService) {
    super(opsat);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name' }
    ]);
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number; data: any[]; }> {
    return this.mapSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    // this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    // this.router.navigate(['./detail'], { relativeTo: this.acr });

  }//onAddRecord

  onFilterRecords(param: object): void {
    throw new Error("Method not implemented.");
  }//onFilterRecords

  onDeleteRecords(datas: any[]): void {
    let idArr = datas.map(x => x.id);
    this.mapSrv.batchDelete(idArr.join(',')).subscribe(()=>{
      this.msgSrv.saveSuccessfully();
      this.refreshRecords();
    });
  }//onDeleteRecords

}
