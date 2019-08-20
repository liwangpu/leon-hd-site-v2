import { Component, OnInit } from '@angular/core';
import { ListViewerOpsatService, ListViewerLauncher, ListViewerTableColumn } from '@app/shared';
import { RoleService } from '@app/feature/basic-ms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'basic-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class RoleComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected roleSrv: RoleService, protected router: Router, protected acr: ActivatedRoute, ) {
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
