import { Injectable } from '@angular/core';
import { CustomRoleService, CustomRole } from '@app/feature/basic-ms';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CustomRoleResolverService implements Resolve<CustomRole> {

  constructor(protected apiSrv: CustomRoleService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CustomRole | Observable<CustomRole> | Promise<CustomRole> {
    let id = route.paramMap.get('id');
    return this.apiSrv.getById(id);
  }//resolve
}
