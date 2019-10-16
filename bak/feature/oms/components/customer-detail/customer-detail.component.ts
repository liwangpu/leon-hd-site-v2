import { Component, OnInit } from '@angular/core';
import { DetailViewerOpsatService, DetailViewerLauncher } from '@app/shared';
import { Customer } from '@app/feature/oms-ms';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '@app/core';

@Component({
  selector: 'oms-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class CustomerDetailComponent extends DetailViewerLauncher implements OnInit {

  customer: Customer;
  icon: string;
  constructor(public opsat: DetailViewerOpsatService, protected acr: ActivatedRoute, protected configSrv: AppConfigService) {
    super(opsat);
    this.customer = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Customer();
  }//constructor

  ngOnInit() {


  }//ngOnInit

}