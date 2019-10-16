import { Injectable } from '@angular/core';
import { Material, MaterialService } from '@app/feature/morejee-ms';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class MaterialResolverService implements Resolve<Material> {

  constructor(protected apiSrv: MaterialService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Material | Observable<Material> | Promise<Material> {
    let id = route.paramMap.get('id');
    return this.apiSrv.getById(id);
  }//resolve
}
