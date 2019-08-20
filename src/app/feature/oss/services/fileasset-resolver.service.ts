import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Fileasset, FileassetService } from '@app/feature/oss-ms';
import { Observable } from 'rxjs';

@Injectable()
export class FileassetResolverService implements Resolve<Fileasset> {

  constructor(protected fileSrv: FileassetService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Fileasset | Observable<Fileasset> | Promise<Fileasset> {
    let id = route.paramMap.get('id');
    return this.fileSrv.getById(id);
  }//resolve
}
