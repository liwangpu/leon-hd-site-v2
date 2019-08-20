import { Injectable } from '@angular/core';
import { Solution, SolutionService } from '@app/feature/morejee-ms';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SolutionResolverService implements Resolve<Solution> {

  constructor(protected apiSrv: SolutionService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Solution | Observable<Solution> | Promise<Solution> {
    let id = route.paramMap.get('id');
    return this.apiSrv.getById(id);
  }//resolve
}
