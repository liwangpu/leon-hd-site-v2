import { Component, OnInit, Input } from '@angular/core';
import { SimpleViewerTableColumn } from '@app/shared';
import { AccessPoint, AccessPointService, Role } from '@app/feature/basic-ms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'basic-role-detail-accesspoint',
  templateUrl: './role-detail-accesspoint.component.html',
  styleUrls: ['./role-detail-accesspoint.component.scss']
})
export class RoleDetailAccesspointComponent implements OnInit {

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
  @Input() role: Role;
  constructor(protected pointSrv: AccessPointService) {

  }//constructor

  ngOnInit() {
    this.pointSrv.query({ pageSize: 9999 }).pipe(tap(res => {
      if (this.role.accessPointKeys) {
        let keys = this.role.accessPointKeys.split(',');
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

}
