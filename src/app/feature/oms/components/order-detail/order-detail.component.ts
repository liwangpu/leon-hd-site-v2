import { Component, OnInit } from '@angular/core';
import { DetailViewerLauncher, DetailViewerOpsatService } from '@app/shared';
import { Order } from '@app/feature/oms-ms';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '@app/core';

@Component({
  selector: 'oms-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class OrderDetailComponent extends DetailViewerLauncher implements OnInit {

  order: Order;
  icon: string;
  constructor(public opsat: DetailViewerOpsatService, protected acr: ActivatedRoute, protected configSrv: AppConfigService) {
    super(opsat);
    this.order = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Order();
  }//constructor

  ngOnInit() {


  }//ngOnInit

}
