import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { MessageCenterService } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MapService, TextureService } from '@app/feature/morejee-ms';

@Component({
  selector: 'morejee-texture',
  templateUrl: './texture.component.html',
  styleUrls: ['./texture.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class TextureComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected apiSrv: TextureService, protected router: Router, protected acr: ActivatedRoute,protected msgSrv: MessageCenterService) {
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
    return this.apiSrv.query(queryParam);
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
    this.apiSrv.batchDelete(idArr.join(',')).subscribe(()=>{
      this.msgSrv.saveSuccessfully();
      this.refreshRecords();
    });
  }//onDeleteRecords

}
