import { Component, OnInit } from '@angular/core';
import { ListViewerLauncher, ListViewerOpsatService, ListViewerTableColumn } from '@app/shared';
import { CategoryService, Category } from '@app/feature/morejee-ms';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailNewComponent } from '../category-detail-new/category-detail-new.component';

@Component({
  selector: 'morejee-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [
    ListViewerOpsatService
  ]
})
export class CategoryComponent extends ListViewerLauncher implements OnInit {

  constructor(protected opsat: ListViewerOpsatService, protected catSrv: CategoryService, protected router: Router, protected acr: ActivatedRoute, protected dialogSrv: MatDialog) {
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

  onQuery(queryParam: object): Observable<{ total: number; data: any[]; }> {
    return this.catSrv.query(queryParam);
  }//onQuery

  onViewRecord(data: any): void {
    this.router.navigate(['./detail', data.id], { relativeTo: this.acr });
  }//onViewRecord

  onAddRecord(): void {
    let ins = this.dialogSrv.open(CategoryDetailNewComponent, { width: '400px', height: '500px' });
    ins.componentInstance.afterSave.subscribe((cat: Category) => {
      this.router.navigate(['./detail', cat.id], { relativeTo: this.acr });
    });
  }//onAddRecord

  onFilterRecords(param: object): void {
    throw new Error("Method not implemented.");
  }
  onDeleteRecords(datas: any[]): void {
    throw new Error("Method not implemented.");
  }


}
