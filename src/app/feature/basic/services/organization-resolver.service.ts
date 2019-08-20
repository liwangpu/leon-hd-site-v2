import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Organization, OrganizationService } from '@app/feature/basic-ms';
import { Observable } from 'rxjs';

@Injectable()
export class OrganizationResolverService implements Resolve<Organization> {

  constructor(protected organSrv: OrganizationService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Organization | Observable<Organization> | Promise<Organization> {
    let id = route.paramMap.get('id');
    return this.organSrv.getById(id);
  }//resolve
}
