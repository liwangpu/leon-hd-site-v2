import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { Observable, of } from 'rxjs';
import { FileassetService } from '@app/feature/oss-ms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'oss-fileasset',
  templateUrl: './fileasset.component.html',
  styleUrls: ['./fileasset.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class FileassetComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected fileSrv: FileassetService, protected router: Router, protected acr: ActivatedRoute) {
    super(opsat);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name', width: 300 }
      // , { name: 'form.description', field: 'description' }
      , { name: 'form.size', field: 'size', width: 120 }
      , { name: 'form.fileExt', field: 'fileExt', width: 100 }
      , { name: 'form.fileState', field: 'fileState', width: 100 }
    ]);
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number; data: any[]; }> {
    return this.fileSrv.query(queryParam);
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
    throw new Error("Method not implemented.");
  }//onDeleteRecords

}
