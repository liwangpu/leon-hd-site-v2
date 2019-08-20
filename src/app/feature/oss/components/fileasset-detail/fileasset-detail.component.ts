import { Component, OnInit } from '@angular/core';
import { DetailViewerOpsatService, DetailViewerLauncher } from '@app/shared';
import { Fileasset } from '@app/feature/oss-ms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'oss-fileasset-detail',
  templateUrl: './fileasset-detail.component.html',
  styleUrls: ['./fileasset-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class FileassetDetailComponent extends DetailViewerLauncher implements OnInit {

  fileAsset: Fileasset;
  constructor(public opsat: DetailViewerOpsatService, protected acr: ActivatedRoute) {
    super(opsat);
    this.fileAsset = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Fileasset();
  }//constructor

  ngOnInit() {

  }//ngOnInit

}
