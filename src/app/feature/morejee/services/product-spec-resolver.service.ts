import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductSpecService, ProductSpec } from '@app/feature/morejee-ms';
import { Observable } from 'rxjs';

@Injectable()
export class ProductSpecResolverService implements Resolve<ProductSpec>{

  constructor(protected specSrv: ProductSpecService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductSpec | Observable<ProductSpec> | Promise<ProductSpec> {
    let id = route.paramMap.get('id');
    return this.specSrv.getById(id);
  }//resolve
}
