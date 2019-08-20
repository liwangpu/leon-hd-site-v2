import { Component, OnInit } from '@angular/core';
import { DetailViewerLauncher, DetailViewerOpsatService } from '@app/shared';
import { Organization } from '@app/feature/basic-ms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class OrganizationDetailComponent extends DetailViewerLauncher implements OnInit {

  organization: Organization;
  constructor(public opsat: DetailViewerOpsatService, protected acr: ActivatedRoute) {
    super(opsat);

    this.organization = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Organization();

    // this.organization = this.acr.snapshot.data['entity'];
    // if (!this.organization) {
    //   let entity = new Organization();
    //   entity.name = "淘宝";
    //   entity.mail = "taobao1@tao.com";
    //   entity.phone = "15721457986";
    //   entity.organizationTypeId = 2;
    //   this.organization = entity;
    // }

  }//constructor

  ngOnInit() {

  }//ngOnInit



  onSaveBasicInfo() {

  }//onSaveBasicInfo

}
