import { Component, OnInit } from '@angular/core';
import { DetailViewerOpsatService, DetailViewerLauncher } from '@app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/feature/morejee-ms';
import { PointKeyEnum } from '@app/feature/basic-ms';
@Component({
  selector: 'morejee-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class ProductDetailComponent extends DetailViewerLauncher implements OnInit {

  private _pointKeys: string[];
  get showPrice() {
    if (this._pointKeys && this._pointKeys.length > 0)
      return this._pointKeys.some(x => x == PointKeyEnum.PriceRetrieve);
    return false;
  }
  get showPartnerPrice() {
    if (this._pointKeys && this._pointKeys.length > 0)
      return this._pointKeys.some(x => x == PointKeyEnum.PartnerPriceRetrieve);
    return false;
  }
  get showPurchasePrice() {
    if (this._pointKeys && this._pointKeys.length > 0)
      return this._pointKeys.some(x => x == PointKeyEnum.PurchasePriceRetrieve);
    return false;
  }
  icon: string;
  product: Product;
  constructor(public opsat: DetailViewerOpsatService, protected acr: ActivatedRoute, protected router: Router) {
    super(opsat);
    this.product = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Product();
    this._pointKeys = this.acr.snapshot.data['pointKeys'] ? this.acr.snapshot.data['pointKeys'] : [];
    this.icon = this.product.icon;
  }//constructor

  ngOnInit() {

  }//ngOnInit

  onProductChange(data: Product) {
    if (!this.product.id)
      this.router.navigate(['./', data.id], { relativeTo: this.acr });
    this.product = data;
  }//onProductChange

}

