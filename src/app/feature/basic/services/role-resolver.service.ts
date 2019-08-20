import { Injectable } from '@angular/core';
import { Role, RoleService } from '@app/feature/basic-ms';
import { Observable } from 'rxjs';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable()
export class RoleResolverService implements Resolve<Role> {

  constructor(protected roleSrv: RoleService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Role | Observable<Role> | Promise<Role> {
    let id = route.paramMap.get('id');
    return this.roleSrv.getById(id);
  }//resolve
}
