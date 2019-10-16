import { Component, OnInit } from '@angular/core';
import { DetailViewerLauncher, DetailViewerOpsatService } from '@app/shared';
import { CustomRole } from '@app/feature/basic-ms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'basic-customrole-detail',
  templateUrl: './customrole-detail.component.html',
  styleUrls: ['./customrole-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class CustomroleDetailComponent extends DetailViewerLauncher implements OnInit {

  customRole: CustomRole;
  constructor(public opsat: DetailViewerOpsatService, protected acr: ActivatedRoute) {
    super(opsat);
    this.customRole = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new CustomRole();
  }//constructor

  ngOnInit() {

  }//ngOnInit

}
