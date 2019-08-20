import { Component, OnInit } from '@angular/core';
import { ListViewerLauncher, ListViewerOpsatService, ListViewerTableColumn } from '@app/shared';
import { CustomRoleService } from '@app/feature/basic-ms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'basic-customrole',
  templateUrl: './customrole.component.html',
  styleUrls: ['./customrole.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class CustomroleComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected roleSrv: CustomRoleService, protected router: Router, protected acr: ActivatedRoute, ) {
    super(opsat);
  }//constructor

  ngOnInit() {
  }//ngOnInit

  getColumnDefines(): Observable<ListViewerTableColumn[]> {
    return of([
      { name: 'form.name', field: 'name' }
      , { name: 'form.description', field: 'description' }
    ]);
  }//getColumnDefines

  onQuery(queryParam: object): Observable<{ total: number, data: any[] }> {
    return this.roleSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    this.router.navigate(['./detail'], { relativeTo: this.acr });
  }//onAddRecord

  onFilterRecords(param: object): void {

  }//onFilterRecords

  onDeleteRecords(datas: any[]): void {

  }//onDeleteRecords



}
