import { Component, OnInit, Input } from '@angular/core';
import { SimpleViewerTableColumn } from '@app/shared';
import { AccessPointService, AccessPoint, CustomRoleService, CustomRole } from '@app/feature/basic-ms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'basic-customrole-detail-accesspoint',
  templateUrl: './customrole-detail-accesspoint.component.html',
  styleUrls: ['./customrole-detail-accesspoint.component.scss']
})
export class CustomroleDetailAccesspointComponent implements OnInit {

  accessPointDefs: SimpleViewerTableColumn[] = [
    {
      name: 'form.name',
      field: 'name'
    },
    {
      name: 'form.description',
      field: 'description'
    }
  ];
  allAccessPoints: AccessPoint[];
  selectedAccessPointIds: string[];
  @Input() customRole: CustomRole;
  constructor(protected pointSrv: AccessPointService, protected customRoleSrv: CustomRoleService) {

  }//constructor

  ngOnInit() {
    this.pointSrv.query({ pageSize: 9999 }).pipe(tap(res => {
      if (this.customRole.accessPointKeys) {
        let keys = this.customRole.accessPointKeys.split(',');
        if (keys.length > 0 && res.data.length > 0) {
          let arr = [];
          for (let key of keys) {
            let it = res.data.filter(x => x.pointKey == key)[0];
            if (!it) continue;
            arr.push(it.id);
          }//for
          this.selectedAccessPointIds = arr;
        }
      }//if
    })).subscribe(res => this.allAccessPoints = res.data);
  }//ngOnInit

  onAccessPointChange(points: AccessPoint[]) {
    let ids = points && points.length > 0 ? points.map(x => x.pointKey) : [];

    this.customRoleSrv.patch(this.customRole.id, CustomRole.genAccessPointDoc(ids.join(","))).subscribe();
  }//onAccessPointChange

}
