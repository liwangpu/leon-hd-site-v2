import { Component, OnInit } from '@angular/core';
import { DetailViewerLauncher, DetailViewerOpsatService } from '@app/shared';
import { Material, MaterialService } from '@app/feature/morejee-ms';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '@app/core';
import { concatMap, map } from 'rxjs/operators';
import { IconService } from '@app/feature/oss-ms';

@Component({
  selector: 'morejee-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class MaterialDetailComponent extends DetailViewerLauncher implements OnInit {

  get iconUploadUrl() {
    return `${this.configSrv.APIServer}/oss/icons`;
  }
  material: Material;
  icon: string;
  constructor(public opsat: DetailViewerOpsatService, protected acr: ActivatedRoute, protected configSrv: AppConfigService, protected iconSrv: IconService, protected materialSrv: MaterialService) {
    super(opsat);
    this.material = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Material();
    this.icon = this.material.icon;
  }//constructor

  ngOnInit() {

    let uploadIconAndPatch = (data) => {
      return this.iconSrv.upload(data.formData, data.header).pipe(concatMap(url => this.materialSrv.patch(this.material.id, Material.IconChangePatchDoc(url)).pipe(map(() => url))));
    };

    this.iconChange.pipe(concatMap(data => uploadIconAndPatch(data))).subscribe(url => {

      this.icon = url;
    });
  }//ngOnInit



}
