import { Component, OnInit } from '@angular/core';
import { DetailViewerLauncher, DetailViewerOpsatService } from '@app/shared';
import { Staticmesh } from '@app/feature/morejee-ms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'morejee-staticmesh-detail',
  templateUrl: './staticmesh-detail.component.html',
  styleUrls: ['./staticmesh-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class StaticmeshDetailComponent extends DetailViewerLauncher implements OnInit {

  staticMesh: Staticmesh;
  constructor(public opsat: DetailViewerOpsatService,protected acr: ActivatedRoute) {
    super(opsat);
    this.staticMesh = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Staticmesh();
  }//constructor

  ngOnInit() {

  }//ngOnInit

}
