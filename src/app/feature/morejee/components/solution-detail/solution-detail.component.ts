import { Component, OnInit } from '@angular/core';
import { DetailViewerOpsatService, DetailViewerLauncher } from '@app/shared';
import { Solution, SolutionService } from '@app/feature/morejee-ms';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '@app/core';
import { IconService } from '@app/feature/oss-ms';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'morejee-solution-detail',
  templateUrl: './solution-detail.component.html',
  styleUrls: ['./solution-detail.component.scss'],
  providers: [
    DetailViewerOpsatService
  ]
})
export class SolutionDetailComponent extends DetailViewerLauncher implements OnInit {

  get iconUploadUrl() {
    return `${this.configSrv.APIServer}/oss/icons`;
  }
  icon: string;
  solution: Solution;
  constructor(public opsat: DetailViewerOpsatService, protected acr: ActivatedRoute, protected configSrv: AppConfigService, protected iconSrv: IconService,protected solutionSrv: SolutionService) {
    super(opsat);
    this.solution = this.acr.snapshot.data['entity'] ? this.acr.snapshot.data['entity'] : new Solution();
    this.icon = this.solution.icon;
  }//constructor

  ngOnInit() {
    let uploadIconAndPatch = (data) => {
      return this.iconSrv.upload(data.formData, data.header).pipe(concatMap(url => this.solutionSrv.patch(this.solution.id, Solution.IconChangePatchDoc(url)).pipe(map(() => url))));
    };

    this.iconChange.pipe(concatMap(data => uploadIconAndPatch(data))).subscribe(url => {
      this.icon = url;
    });
  }//ngOnInit

}