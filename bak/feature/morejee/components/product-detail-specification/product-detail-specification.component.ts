import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Product, ProductSpec } from '@app/feature/morejee-ms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProductSpecificationDetailComponent } from '../product-specification-detail/product-specification-detail.component';

@Component({
  selector: 'morejee-product-detail-specification',
  templateUrl: './product-detail-specification.component.html',
  styleUrls: ['./product-detail-specification.component.scss']
})
export class ProductDetailSpecificationComponent implements OnInit {
  private _product: Product;

  @Input() set product(val: Product) {
    if (val.specifications && val.specifications.length)
      this.dataSource.data = val.specifications;
    this._product = val;
  }
  get product() {
    return this._product;
  }
  @Output() productChange = new EventEmitter();
  displayedColumns: string[] = ['no', 'icon', 'name', "description", 'price', "partnerPrice", "purchasePrice"];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(protected router: Router, protected acr: ActivatedRoute, private dialogSrv: MatDialog) {

  }//constructor

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }//ngOnInit

  editSpecification(spec?: ProductSpec) {
    if (!spec)
      spec = new ProductSpec();
    spec['productId'] = this.product.id;
    let dialogIns = this.dialogSrv.open(ProductSpecificationDetailComponent, { width: '800px', height: '700px', disableClose: true, data: spec });
    dialogIns.componentInstance.afterSave.subscribe(data => {

      if (spec.id) {
        for (let idx = this.dataSource.data.length - 1; idx >= 0; idx--) {
          let it = this.dataSource.data[idx];
          if (it['id'] == spec.id) {
            this.dataSource.data[idx] = data;
            this.dataSource.connect().next(this.dataSource.data);
            break;
          }
        }//for
      }//if
    });
  }//editSpecification

}
