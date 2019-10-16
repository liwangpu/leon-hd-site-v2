import { Injectable } from '@angular/core';
import { StaticmeshService, Staticmesh } from '@app/feature/morejee-ms';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class StaticmeshResolverService implements Resolve<Staticmesh> {

  constructor(protected meshSrv: StaticmeshService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Staticmesh | Observable<Staticmesh> | Promise<Staticmesh> {
    let id = route.paramMap.get('id');
    return this.meshSrv.getById(id);
  }//resolve
}
