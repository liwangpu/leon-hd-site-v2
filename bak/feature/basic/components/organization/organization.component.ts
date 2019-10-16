import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrganizationService } from '@app/feature/basic-ms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'basic-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class OrganizationComponent extends ListViewerLauncher implements OnInit {


  constructor(protected opsat: ListViewerOpsatService, protected organSrv: OrganizationService, protected router: Router, protected acr: ActivatedRoute) {
    super(opsat);
  }//constructor

  ngOnInit() {

  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name' }
      , { name: 'form.organizationType', field: 'organizationTypeName', sortField: 'organizationTypeId', width: 150 }
      , { name: 'form.mail', field: 'mail', width: 200 }
      , { name: 'form.phone', field: 'phone', width: 120 }
      , { name: 'form.description', field: 'description' }
    ]);
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number, data: any[] }> {
    return this.organSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    this.router.navigate(['./detail'], { relativeTo: this.acr });
  }//onAddRecord

  onFilterRecords(param: object): void {
    console.log('filter records');
  }//onFilterRecords

  onDeleteRecords(datas: any[]): void {
    console.log('delete records', datas);
  }//onDeleteRecords


}
